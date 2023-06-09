export const FooterNav = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div class=' border-t border-zinc-800 py-6 text-sm text-zinc-400'>
      <div class='container flex items-center justify-between space-x-2'>
        <div>
          © 2019 — {currentYear} Proper is built by{' '}
          <a class='link' href='https://natedunn.net'>
            Nate Dunn
          </a>
        </div>
        <div class='flex items-center space-x-2'>
          <div>
            <a class='link' href='https://github.com/natedunn/proper-builder'>
              Github
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
