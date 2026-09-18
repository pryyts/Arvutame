import { useSession } from './hooks/useSession';
import { SettingsScreen } from './components/SettingsScreen';
import { PracticeScreen } from './components/PracticeScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { DesignToggle } from './components/DesignToggle';

function App() {
  const session = useSession();

  return (
    <>
      <DesignToggle />

      <header className="navbar">
        <span className="navbar__brand">🧮 Peastarvutamine</span>
      </header>

      <main className="section">
        <div className="container app-container">
          {session.screen === 'settings' && <SettingsScreen onStart={session.start} />}

          {session.screen === 'practice' && session.problem && session.settings && (
            <PracticeScreen
              settings={session.settings}
              problem={session.problem}
              index={session.index}
              timeLeft={session.timeLeft}
              isWrong={session.isWrong}
              correctHint={session.correctHint}
              inputDisabled={session.inputDisabled}
              onSubmit={session.submit}
              onCancel={session.cancel}
            />
          )}

          {session.screen === 'results' && session.settings && (
            <ResultsScreen
              settings={session.settings}
              correct={session.correct}
              wrong={session.wrong}
              elapsedMs={session.elapsedMs}
              onRestart={session.restart}
            />
          )}
        </div>
      </main>
    </>
  );
}

export default App;
