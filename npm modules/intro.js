/*

    npm => Node Package Manager

    npm i <package>      // means package will be installed locally , in this folder
    npm i <package> -g  // means package will be installed globally 

    npm uninstall <package>      // means package will be uninstalled locally ,from this folder
    npm uninstall <package> -g  // means package will be uninstalled globally 

    npm rm // to remove package  

    NOTE : ALWAYS ADD FLAG WHEN UNINSTALLING DEV OR GLOBAL DEPENDECNY   


    npm init  // initalise current folder
    npm init -y  // initalise current folder with yes for all questions


    npm install // reads package.json file and install node_modules
    npm i <package> -D  // installs package as a devDependency
    npm i <package>@version  // installs package with specified version

    npm run dev // runs app as dev,  script in package.json can be modified to specify how to run app using node or nodemon, as the scirpt will be run by server when deployed  

    npm start // is used for running app , script in package.json can be modified to specify how to run app using node or nodemon, as the scirpt will be run by server when deployed  


    version numbers of dependencies

        "nodemon" :  "^2.0.22"
    
        //  first  number reprsents  major version
        //  second number reprsents  minor version
        //  third  number reprsents  patch version

        // ^ means allow updates for minor and patch version but not for major version
        // ~ means allow updates for patch version but not for major, minor versions
        // only * means allow updates for every major, minor, patch versions
        // ^ wihtout this we specify that we want a exact version e.g 2.0.22


         


*/
const { format } = require("date-fns");
console.log(format(new Date(), "yyyy MM dd\tHH:mm:ss"));
