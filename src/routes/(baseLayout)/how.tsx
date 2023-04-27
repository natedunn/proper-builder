import { A, Title } from 'solid-start';
import { Heading } from '~/components/Heading';
import { Code } from '~/components/docs/Code';
import { Highlight } from '~/components/docs/Highlight';
import { LineHeading } from '~/components/docs/LineHeading';
import { PWrapper } from '~/components/docs/PWrapper';

export default function HowPage() {
  return (
    <>
      <header class='container py-12'>
        <Title>Proper — Using Proper</Title>
        <Heading tag='h1'>How to use Proper</Heading>
      </header>
      <div class='flex-auto bg-zinc-900 pb-24 pt-12'>
        <div class='container space-y-12'>
          <div class='space-y-3'>
            <LineHeading>Build your manifest</LineHeading>
            <PWrapper>
              <p>
                Use the{' '}
                <A class='link underline' href='/'>
                  builder
                </A>{' '}
                to generate your own Proper script, complete with requested dependencies.
              </p>
              <ul class='space-y-6 leading-8'>
                <li>
                  <Highlight>1. Select an origin</Highlight>
                  <div class='ml-6 mt-2'>
                    Choose between NPM, Homebrew, Cask (via Homebrew), Mac App Store, and Composer.
                  </div>
                </li>
                <li>
                  <Highlight>2. Search</Highlight>
                  <div class='ml-6 mt-2'>Find the dependency you'd like to install.</div>
                </li>
                <li>
                  <Highlight>3. Add to queue</Highlight>
                  <div class='ml-6 mt-2'>Add the dependency to the queue for download.</div>
                </li>
                <li>
                  <Highlight>4. Download</Highlight>
                  <div class='ml-6 mt-2'>
                    When you have added all the dependencies you'd like, download the script to run
                    locally.
                  </div>
                </li>
              </ul>
            </PWrapper>
          </div>
          <div class='space-y-8'>
            <div class='space-y-4'>
              <LineHeading>Run Proper</LineHeading>
              <PWrapper>
                <p>Navigate to directory where you have downloaded your Proper script:</p>
              </PWrapper>
              <Code title='~'>{`
cd ~/<location-of-directory>/proper
            `}</Code>
            </div>
            <div class='space-y-4'>
              <PWrapper>
                <p>
                  If you take a peek inside the <Highlight>/manifest</Highlight> directory, you
                  should see a list files that correspond to the list of available origins (npm,
                  brew, cask, mas, composer).
                </p>
              </PWrapper>
            </div>
            <div class='space-y-4'>
              <PWrapper>
                <p>To install all items in manifest, call the entry script directly:</p>
              </PWrapper>
              <Code title='~/<location-of-directory>/proper'>{`
sh proper
            `}</Code>
            </div>
          </div>
          <div class='space-y-4'>
            <LineHeading>Known Issues</LineHeading>
            <PWrapper>
              <p>
                There are a list of{' '}
                <a
                  class='link underline'
                  href='https://github.com/natedunn/proper/blob/main/KNOWN-ISSUES.md'
                  target='_blank'
                >
                  known issues
                </a>
                , however if you uncover any issues not mentioned there,{' '}
                <a
                  class='link underline'
                  target='_blank'
                  href='https://github.com/natedunn/proper/issues'
                >
                  please file an issue
                </a>
                .
              </p>
            </PWrapper>
          </div>
        </div>
      </div>
    </>
  );
}
