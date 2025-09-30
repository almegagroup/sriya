# ADR-0001: Monorepo + Firebase + React (Vite)

## Status
Accepted

## Context
Single repo to keep frontend (web) and backend (functions) together for Local=Live parity.

## Decision
Use a monorepo with folders: web/, functions/, docs/.
JavaScript only (no TypeScript).
Hosting & backend on Firebase. Reporting bridge placeholder: Supabase (Phase-4).

## Consequences
- Easier CI/CD and shared conventions
- Simple local dev via emulators
