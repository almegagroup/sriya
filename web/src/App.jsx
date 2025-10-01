import { useState } from "react";
import { api } from "./lib/api";
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "./lib/firebase";

export default function App() {
  const [out, setOut] = useState("");
  const [items, setItems] = useState([]);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const hitHello = async () => {
    setOut("Loading...");
    try {
      setOut(JSON.stringify(await api.hello()));
    } catch (e) {
      setOut("Error: " + e.message);
    }
  };

  const loadRecent = async () => {
    setOut("Loading list...");
    try {
      const d = await api.list(5);
      setItems(d.items || []);
      setOut(`Loaded ${d.count} item(s)`);
    } catch (e) {
      setOut("Error: " + e.message);
    }
  };

  const doSignup = async () => {
    setOut("Signing up...");
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      setOut("Signup OK. Now signed in.");
    } catch (e) {
      setOut("Signup error: " + e.message);
    }
  };

  const doSignin = async () => {
    setOut("Signing in...");
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      setOut("Sign-in OK.");
    } catch (e) {
      setOut("Sign-in error: " + e.message);
    }
  };

  const doSignout = async () => {
    await signOut(auth);
    setOut("Signed out.");
  };

  const callMe = async () => {
    setOut("Calling /me...");
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Not signed in");
      const idToken = await user.getIdToken();
      const d = await api.me(idToken);
      setOut(JSON.stringify(d));
    } catch (e) {
      setOut("Error: " + e.message);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="bg-[var(--card)] rounded-2xl p-6 shadow-lg w-full max-w-xl">
        <h1 className="text-2xl font-semibold mb-4">SRIYA • Auth Test</h1>

        <div className="grid gap-2 mb-4">
          <input
            className="px-3 py-2 rounded-xl bg-black/20"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="px-3 py-2 rounded-xl bg-black/20"
            placeholder="password"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              onClick={doSignup}
              className="px-3 py-2 rounded-2xl bg-brand-600 hover:bg-brand-700"
            >
              Sign up
            </button>
            <button
              onClick={doSignin}
              className="px-3 py-2 rounded-2xl bg-brand-600 hover:bg-brand-700"
            >
              Sign in
            </button>
            <button
              onClick={doSignout}
              className="px-3 py-2 rounded-2xl bg-black/30 hover:bg-black/40"
            >
              Sign out
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={hitHello}
            className="px-4 py-2 rounded-2xl bg-brand-600 hover:bg-brand-700"
          >
            Call /hello
          </button>
          <button
            onClick={loadRecent}
            className="px-4 py-2 rounded-2xl bg-brand-600 hover:bg-brand-700"
          >
            Load recent (5)
          </button>
          <button
            onClick={callMe}
            className="px-4 py-2 rounded-2xl bg-brand-600 hover:bg-brand-700"
          >
            Call /me (protected)
          </button>
        </div>

        <pre className="mt-4 text-sm text-[var(--muted)] whitespace-pre-wrap break-all">
          {out || "Use Email/Password to sign up/in, then Call /me"}
        </pre>

        {items.length > 0 && (
          <ul className="mt-4 space-y-2">
            {items.map((it) => (
              <li key={it.id} className="p-3 rounded-xl bg-black/20">
                <div className="text-sm font-medium">#{it.id}</div>
                <div className="text-sm">msg: {it.msg}</div>
                <div className="text-xs opacity-70">env: {it.env}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
