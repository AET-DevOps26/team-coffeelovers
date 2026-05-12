# Contributing Guide

This document explains how we work on this project, how branches should be created, how changes should be merged, and what every contributor should follow.

---

## Table of Contents

- [General Rules](#1-general-rules)
- [Branching Strategy](#2-branching-strategy)
- [Development Process](#3-development-process)
- [Merge Flow](#4-merge-flow)
- [Code Standards](#5-code-standards)
- [README Update Requirements](#6-readme-update-requirements)
- [Questions and Help](questions-and-help)

---

## 1. General Rules

Before contributing, please confirm that you accept the following rules:

- ✅ Create a new branch for each task
- ✅ Commit messages should be clear and descriptive
- ✅ Test all your changes before merge
- ✅ Update README when adding new feature
- ✅ Update README when setup, usage, structure, dependencies, or environment variables change
- ✅ Open Pull Requests into `develop` first
- ✅ Merge into `main` only after changes are tested in `develop`
- ✅ Delete branches after merges
- ✅ Do not commit secrets, API keys, tokens, or private credentials

---

## 2. Branching Strategy

### `main`

The `main` branch contains the stable version of the project.

Rules for `main`:

- Code in `main` should always be stable.
- Only tested and reviewed changes should be merged into `main`.
- Direct commits to `main` are not allowed.
- Changes should reach `main` only after they are first merged and tested in `develop`.


### `develop`

The `develop` branch is used for development and integration.

Rules for `develop`:

- All completed tasks are first merged into `develop`.
- The team tests and checks changes in `develop`.
- When `develop` is stable, it can be merged into `main`.
- New branches must always be created from the latest version of `develop`.


### Branch Types

| Branch | Purpose | Base Branch |
|--------|---------|-------------|
| `main` | Production environment. Only for releases. | - |
| `develop` | Development environment. All features merge here. | `main` |
| `feature/*` | New feature development | `dev` |
| `bugfix/*` | Bug fixes | `develop` |
| `hotfix/*` | Critical production fixes | `main` |

**Branch Naming Rules:**

Format: `<type>/<issue-number>-<task-definition>`

**Rules:**
- **Type**: `feature`, `bugfix`, `hotfix`
- **Issue Number**: GitHub issue number (e.g., 10, 25, 42)
- **Task Definition**: Hyphen-separated, short description
- All letters must be **lowercase**
- Use hyphens (`-`) instead of spaces

---

## 3. Development Process

### Step 1: Create a New Feature Branch
### Step 2: Make Your Changes

- Write your code
- Add tests
- Update README (if needed)
- Test your code

### Step 3: Commit Your Changes
### Step 4: Push to Branch
### Step 5: Create a Pull Request

- Select Base: `develop`, Compare: `feature/10-create-contribution-guide`
- Write a title and description

### Step 6: Review Process

- At least 1 review is required
- All tests must pass
- Merge if there are no conflicts
- Feature branch will be deleted

**After PR is merged, feature branch should be deleted.**

### Step 7: Merge to Main

Changes in the develop branch are regularly merged to main.

---

## 4. Merge Flow

Our project uses the **Git Flow** model:

```
main (production)
  ↑
develop (development)
  ↑
feature/xxx (task branches)
```

---

## 5. Code Standards

### General Principles

- Use clear variable and function names.
- Keep functions small when possible.
- Remove unused code.
- Remove unnecessary comments.
- Do not commit temporary test files.

---

## 6. README Update Requirements

### When to Update

- A new feature is added
- Setup instructions change
- A new dependency is added
- The project structure changes
- API endpoints are added or changed
- Environment variables are added or changed
- Running instructions change
- Important project decisions are made

---

## Questions and Help

- **GitHub Issues**: For bugs and feature requests with detailed explanation
- **Discussions**: For general questions
- **Pull Request Comments**: For code review discussions

---

**Thank you for helping us develop this project! 🙏**
