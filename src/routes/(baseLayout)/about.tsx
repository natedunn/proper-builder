import { Title } from 'solid-start';
import { Heading } from '~/components/Heading';
import { Code } from '~/components/docs/Code';
import { LineHeading } from '~/components/docs/LineHeading';
import { PWrapper } from '~/components/docs/PWrapper';

export default function AboutPage() {
  return (
    <>
      <header class='container py-12'>
        <Title>Proper — About</Title>
        <Heading tag='h1'>About Proper</Heading>
      </header>
      <div class='flex-auto bg-zinc-900 pb-24 pt-12'>
        <div class='container space-y-12'>
          <div>
            <LineHeading>What is Proper?</LineHeading>
            <PWrapper>
              <p>
                Proper is a script that helps you manage your Mac's dependencies. It contains three
                main parts: <span class='underline'>core</span>,{' '}
                <span class='underline'>manifests</span>, and{' '}
                <span class='underline'>entry script</span>
              </p>
            </PWrapper>
          </div>
          <div>
            <Heading tag='h3' variant='h4'>
              Core
            </Heading>
            <PWrapper>
              <p>
                Core scripts run the actual installation of your dependencies and other helpers.
                While they do not need to be edited, you may make changes if needed.
              </p>
            </PWrapper>
          </div>
          <div>
            <Heading tag='h3' variant='h4'>
              Manifests
            </Heading>
            <PWrapper>
              <p>During the installation process, Proper runs through manifest files provided.</p>
              <p>
                These manifests contain, line-by-line, each requested application, brew, package,
                etc. You can set these manifest files manually but I recommend using the builder to
                make this much easier.
              </p>
              <p>Here's a few examples of what these manifest files may look like:</p>
            </PWrapper>
            <div class='mt-8 space-y-4'>
              <Code title='~/manifest/casks'>{`
authy
1password
arc
              `}</Code>
              <Code title='~/manifest/npm'>{`
gh
rust
supabase
pnpm
              `}</Code>
              <Code title='~/manifest/mas'>{`
904280696::things-3
1502839586::hand-mirror
1384080005::tweetbot
              `}</Code>
            </div>
          </div>
          <div>
            <Heading tag='h3' variant='h4'>
              Entry script
            </Heading>
            <PWrapper>
              <p>
                The entry script located at `~/proper` and is the main script that runs all the core
                scripts.
              </p>
            </PWrapper>
          </div>
          <div>
            <Heading tag='h3' variant='h4'>
              Custom scripts (optional)
            </Heading>
            <PWrapper>
              <p>
                If you are familiar with writing shell scripts, you can add your own custom scripts
                to `~/custom`. This is an optional file and will run only after the core scripts and
                manifests.
              </p>
            </PWrapper>
          </div>
        </div>
      </div>
    </>
  );
}
