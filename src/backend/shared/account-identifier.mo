import Principal "mo:base/Principal";
import Blob "mo:base/Blob";
import Nat8 "mo:base/Nat8";
import Nat32 "mo:base/Nat32";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Char "mo:base/Char";
import Sha256 "mo:sha2/Sha256";

module {
  public type AccountIdentifier = Blob;
  public type Subaccount = Blob; // 32 bytes

  // Prefix per spesifikasi ICP Ledger: "\x0Aaccount-id"
  let PREFIX : [Nat8] = [
    0x0A, 0x61, 0x63, 0x63, 0x6F, 0x75, 0x6E, 0x74, 0x2D, 0x69, 0x64
  ];

  // ========== Public API ==========

  /// Hasil: 32 bytes (4-byte CRC32 BE + 28-byte SHA224 digest).
  public func fromPrincipal(owner : Principal, sub : ?Subaccount) : AccountIdentifier {
    let sub32 = switch (sub) { case null defaultSubaccount(); case (?s) ensure32(s) };

    let ownerBytes : [Nat8] = Blob.toArray(Principal.toBlob(owner));
    let subBytes   : [Nat8] = Blob.toArray(sub32);

    let data : [Nat8] = concat3(PREFIX, ownerBytes, subBytes);

    // Pakai paketmu: sha224
    let hashBlob = Sha256.fromArray(#sha224, data);   // -> Blob (harus 28 bytes)
    let hash : [Nat8] = Blob.toArray(hashBlob);

    let checksumBE : [Nat8] = crc32BytesBE(hash);     // 4 bytes (big-endian)

    Blob.fromArray(Array.append(checksumBE, hash))    // 32 bytes
  };

  /// Ubah AccountIdentifier (32-byte blob) menjadi hex lowercase 64 chars.
  public func toText(aid : AccountIdentifier) : Text {
    bytesToHex(Blob.toArray(aid))
  };

  /// Subaccount default (32 bytes nol).
  public func defaultSubaccount() : Subaccount {
    Blob.fromArray(Array.tabulate<Nat8>(32, func _ { 0 }))
  };

  // ========== Internal helpers ==========

  func ensure32(b : Blob) : Blob {
    let arr = Blob.toArray(b);
    if (arr.size() == 32) return b;
    if (arr.size() > 32) {
      let slice = Array.tabulate<Nat8>(32, func (i) { arr[i] });
      return Blob.fromArray(slice);
    };
    let padded = Array.append<Nat8>(arr, Array.tabulate<Nat8>(32 - arr.size(), func _ { 0 }));
    Blob.fromArray(padded)
  };

  func concat3(a : [Nat8], b : [Nat8], c : [Nat8]) : [Nat8] {
    Array.append(a, Array.append(b, c))
  };

  // -------- CRC32 (IEEE 802.3) — aman tanpa underflow --------
  let CRC_POLY : Nat32 = 0xEDB88320;

  func crc32(bytes : [Nat8]) : Nat32 {
    var crc : Nat32 = 0xFFFFFFFF;
    for (byte in bytes.vals()) {
      crc := crc ^ Nat32.fromNat(Nat8.toNat(byte));
      var i = 0;
      while (i < 8) {
        if ((crc & 1) == 1) {
          crc := (crc >> 1) ^ CRC_POLY;
        } else {
          crc := crc >> 1;
        };
        i += 1;
      };
    };
    crc ^ 0xFFFFFFFF
  };

  func crc32BytesBE(bytes : [Nat8]) : [Nat8] {
    let v : Nat32 = crc32(bytes);
    [
      Nat8.fromNat(Nat32.toNat((v >> 24) & 0xFF)),
      Nat8.fromNat(Nat32.toNat((v >> 16) & 0xFF)),
      Nat8.fromNat(Nat32.toNat((v >>  8) & 0xFF)),
      Nat8.fromNat(Nat32.toNat((v      ) & 0xFF))
    ]
  };

  // ===== Hex encoder =====
  func nybbleToHex(n : Nat8) : Char {
    let v = Nat8.toNat(n);
    // kamu boleh pakai Char.fromNat32(...) seperti versi kamu; keduanya ok
    if (v < 10) { Char.fromNat32(0x30 + Nat32.fromNat(v)) } else { Char.fromNat32(0x61 + Nat32.fromNat(v - 10)) }
  };

  func bytesToHex(bs : [Nat8]) : Text {
    var t = "";
    for (b in bs.vals()) {
      let hi = (b >> 4) & 0x0F;
      let lo = b & 0x0F;
      t #= Text.fromChar(nybbleToHex(hi));
      t #= Text.fromChar(nybbleToHex(lo));
    };
    t
  };
}