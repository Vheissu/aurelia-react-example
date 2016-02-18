# aurelia-react-example
A Github repository to accompany the [blog post](http://ilikekillnerds.com/2015/03/how-to-use-react-js-in-aurelia/) I wrote on integrating React into Aurelia.

## Install
Install just like you would the standard Skeleton.

- Pull down this repository somewhere
- Open up PowerShell/Terminal/iTerm or whatever
- npm install
- jspm install -y
- ???
- Profit $$$

## Explanation
You might have some questions about how things are working and structured, this is not just a cookie-cutter version of the Skeleton. There is structure and conventions being used here to the point where you could this use as a React starter Skeleton of sorts.

To render our React components, we use an Aurelia custom element to render a specific component. This won't show you how to create an element that can pragmatically load a React component, although with a little work, you could make it do that.

Inside of our custom element folder we have a file called ``react-element.js`` this is where we create an Aurelia custom element. Pay close attention to the top, we import our React component and use ``!jsx`` on the end. This tells System.js to use the JSX loader. This allows you to write React components using JSX syntax and get the IDE advantages of syntax highlighting and more.

We tell the custom element we don't have a HTML view and we will be handling the rendering ourselves. We reference the custom element using React syntax inside of the ``render`` method we created and gets called by the ``bind`` method in our ViewModel.

### The structure
Inside of the ``src`` directory we have a ``components`` directory. Inside of that we have a folder for ``custom-attributes``, ``custom-elements`` and ``react-components``. As you can probably guess the attributes folder is for attributes, the elements folder is for custom elements and the React folder is for React JSX components.

You can change this structure to work as you see fit. Remove things and move them around. A great structure in your applications can make your life a lot easier as it grows.

### Dependencies
In this repository we have a few dependencies for working with React and its JSX syntax.

- react: The React.js library itself
- react-dom: The standalone React DOM library for rendering components, etc.
- jsx: A System.js loader for loading JSX files via import statements