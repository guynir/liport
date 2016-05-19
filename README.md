#Liport

__A lightweight framework for importing content.__

### Introduction
Liport (which is portmanteau of 'Lightweight' and 'Import') is a small-footprint framework that loads contents from external HTML files into the current page. It was originally intended for use in Single Page Applications, however it can be used for any purpose a user finds fits.

### How to use
Using the library is pretty much straight forward. No configuration required:

```javascript
<head>
    <script type="text/javascript" src="scripts/lib/liport.js"></script>
</head>
```

The code inside `liport.js` run automatically and import external resources.

To specify which resource to load, use `<link rel="import" src="...">` element. e.g.:
```javascript
<head>
    <link rel="import" href="pages/dashboard.html" data-view-name="dashboardPage">
</head>
```

This will cause `pages/dashboard.html` to be loaded from external HTML file and associate it with a view named `dashboardPage`.

To apply the contents of the above import, simply define a body element with the same view name:
```javascript
<body>
    <div data-view-name="loginPage"></div>
    <p data-view-name="dashboardPage"></p>
    <label data-view-name="userDetailsPage"></label>
</body>
```

Liport will search for a body element annotated with matching `data-view-name` attribute and apply the contents in it.
You may choose to define multiple elements with the same view name, in which case - the contents will be applied to all of them.
