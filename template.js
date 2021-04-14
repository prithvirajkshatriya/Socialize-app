export default () => {
  return `
        <!DOCYPE html>
        <html lang="en">
            <head>
                <title>Socialize</title>
                <link rel="preconnect" href="https://fonts.gstatic.com">
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" 
                rel="stylesheet">
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet">
            </head>
            <body>
                <div id="root"></div>
                <script type="text/javascript" src="/dist/bundle.js"></script>
            </body>
        </html>
    `;
};
