import { useEffect, useState } from "react";
import Login from "./login";
import { AuthClient } from "@dfinity/auth-client";
import { createActor } from "../../../../declarations/user_management";
import { canisterId } from "../../../../declarations/user_management/index.js";
import { InternetIdentityState } from "@/types/auth";

const network = import.meta.env.DFX_NETWORK || "local";
const identityProvider =
  network === "ic"
    ? "https://identity.ic0.app"
    : "http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943";

interface LoginPageProps {
  state: InternetIdentityState;
  setState: React.Dispatch<React.SetStateAction<InternetIdentityState>>;
}

export default function LoginPage({ state, setState }: LoginPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    updateActor();
  }, []);

  const updateActor = async () => {
    try {
      const authClient = await AuthClient.create();
      const identity = authClient.getIdentity();
      const actor = createActor(canisterId, {
        agentOptions: { identity },
      });
      const isAuthenticated = await authClient.isAuthenticated();

      setState((prev) => ({
        ...prev,
        actor,
        authClient,
        isAuthenticated,
      }));
    } catch (error) {
      console.error("Error updating actor:", error);
      setError("Failed to initialize authentication");
    }
  };

  const login = async (): Promise<void> => {
    setIsLoading(true);
    setError(undefined);

    try {
      if (!state.authClient) {
        console.error("Auth client not initialized");
        setError("Authentication client not initialized");
        return;
      }

      await state.authClient.login({
        identityProvider,
        onSuccess: updateActor,
      });
    } catch (error) {
      console.error("Login error:", error);
      setError(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const whoami = async (): Promise<void> => {
    try {
      if (!state.actor) {
        console.error("Actor not initialized");
        setError("Actor not initialized");
        return;
      }

      setState((prev) => ({ ...prev, principal: "Loading..." }));
      const result = await state.actor.whoami();
      const principal = result.toString();

      setState((prev) => ({ ...prev, principal }));
    } catch (error) {
      console.error("Whoami error:", error);
      setState((prev) => ({ ...prev, principal: "Error loading principal" }));
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-500/25 to-pink-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-br from-emerald-500/20 to-teal-500/15 rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute top-20 right-20 w-48 h-48 bg-gradient-to-br from-indigo-500/15 to-blue-500/10 rounded-full blur-2xl animate-pulse delay-700" />
        <div className="absolute bottom-20 left-20 w-56 h-56 bg-gradient-to-br from-violet-500/15 to-purple-500/10 rounded-full blur-2xl animate-pulse delay-300" />
        <div className="absolute top-1/3 left-1/2 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-400/15 rounded-full blur-xl animate-pulse delay-1500" />
        <div className="absolute bottom-1/3 left-1/4 w-40 h-40 bg-gradient-to-br from-emerald-400/15 to-green-400/10 rounded-full blur-xl animate-pulse delay-800" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(168,85,247,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(16,185,129,0.05),transparent_50%)]" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/5 w-2 h-2 bg-blue-400/40 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-purple-400/30 rounded-full animate-pulse delay-500" />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-emerald-400/40 rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-1/3 right-1/5 w-2.5 h-2.5 bg-cyan-400/25 rounded-full animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-indigo-400/35 rounded-full animate-pulse delay-300" />
        <div className="absolute bottom-1/2 right-1/3 w-1.5 h-1.5 bg-violet-400/30 rounded-full animate-pulse delay-1200" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Login
          onLogin={login}
          isLoading={isLoading}
          error={error}
          className="backdrop-blur-xl bg-slate-900/80 border-slate-700/30 shadow-2xl shadow-blue-900/10"
        />

        <div className="mt-8 p-6 backdrop-blur-xl bg-slate-800/70 border border-slate-700/40 rounded-xl text-sm text-slate-300 shadow-xl shadow-purple-900/10">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <p className="font-medium text-slate-200">About Internet Identity</p>
          </div>
          <div className="space-y-2 text-xs leading-relaxed text-slate-400">
            <p>
              Internet Identity provides secure, anonymous authentication without passwords or personal data collection.
            </p>
            <p>
              Your identity is cryptographically secured and completely private – perfect for a secure learning environment.
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-700/50 text-slate-400 text-xs leading-relaxed">
            Experience personalized AI-powered learning with Askala's advanced RAG technology that adapts to your unique learning style.
          </div>

          <div className="mt-4 space-y-2">
            <button
              onClick={whoami}
              disabled={!state.actor}
              className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Whoami
            </button>

            {state.principal && state.principal !== "Click \"Whoami\" to see your principal ID" && (
              <div className="mt-2 p-3 bg-slate-700/50 rounded-lg">
                <p className="text-xs text-slate-300 font-medium">Your Principal ID:</p>
                <p className="text-xs text-slate-400 break-all mt-1">{state.principal}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 via-transparent to-slate-900/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 via-transparent to-slate-900/20 pointer-events-none" />
    </div>
  );
}
