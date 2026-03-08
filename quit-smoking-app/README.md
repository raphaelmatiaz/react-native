# StreakQuit

StreakQuit is a calm, local-first quit-smoking app built with Expo and React Native.

## Product Direction
- Identity-first behavior change support.
- Non-shaming relapse and recovery experience.
- Local-only storage by default (AsyncStorage).
- Ethical premium model with no crisis-context upsell.

## Core Features
- Onboarding with quit profile and personal reasons.
- Home flow with craving and relapse actions.
- Guided craving intervention flow.
- Relapse logging with recovery mode support.
- Progress metrics and milestone timeline.
- Profile area: reasons, journal, settings, premium.
- Notification scheduling and milestone reminders.

## Development

Install dependencies:

```bash
npm install
```

Run app:

```bash
npm run start
```

Quality checks:

```bash
npm run lint
npm run typecheck
npm run test
```

## Release Readiness Artifacts
- `eas.json` includes `development`, `preview`, and `production` build profiles.
- See `../knowledge-base/aso-metadata.md` for listing metadata and screenshot plan.
- See `../knowledge-base/release-copy-review.md` for tone review guidance.
- See `../knowledge-base/privacy-local-only.md` for legal/privacy wording.
- See `../knowledge-base/launch-checklist.md` for launch checklist and metrics plan.

## Privacy Model
- User data is stored locally on the device.
- No required account for core quit functionality.
- App reset clears locally stored data.
