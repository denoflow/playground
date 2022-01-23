import Script from 'next/script';

const Ga = () => {
  return (
    <div className="container">
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-MR6B4Y2D6J"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-MR6B4Y2D6J');
        `}
      </Script>
    </div>
  );
};

export default Ga;
