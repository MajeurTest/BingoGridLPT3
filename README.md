# BingoGridLPT

Bingo Grid made for the game Super Mario Sunshine in LeNaim Let's Play Tournament 3 (LPT 3).
Calculate automatically the challlengers' points based on their completed quests.
Also gives the number of LPT points won based on an established points scale.

The grids can be completed in an hour, but the main goal here is to have the maximum number of points.

## Points on Poule's Grids

### Challenge points 
Here are the points for the bongo grids :

- Green challenge : 1 point
- Orange challenge : 2 points
- Red challenge : 3 points
- Completed Line/Column Bonus : 2 points per completed bingo column/line

The maximum points for the Poule 1 and 2 are 43, where it is 48 for the Poule Finale

### LPT Point scale

#### Poule 1 and 2

The scale for the LPT points in the Poule 1 and Poule 2 are :

- Between **0** and **2** Bingo Points : **0** LPT Points
- Between **3** and **7** Bingo Points : **1** LPT Points
- Between **8** and **14** Bingo Points : **2** LPT Points
- Between **15** and **22** Bingo Points : **3** LPT Points
- Between **23** and **29** Bingo Points : **4** LPT Points
- Between **30** and **42** Bingo Points : **5** LPT Points
- **43** Bingo Points : **6** LPT Points
  
#### Poule Finale

The scale for the LPT points in the Poule Fianle are :

- Between **0** and **4** Bingo Points : **0** LPT Points
- Between **5** and **12** Bingo Points : **1** LPT Points
- Between **13** and **19** Bingo Points : **2** LPT Points
- Between **20** and **27** Bingo Points : **3** LPT Points
- Between **28** and **34** Bingo Points : **4** LPT Points
- Between **35** and **47** Bingo Points : **5** LPT Points
- **48** Bingo Points : **6** LPT Points


## Case of the Equality's Grid

When there is an equality between players in the LPT, there is a game chosen randomly. If Super Mario Sunshine in chosen, the goal will be, in a random generated grid, to complete a line or a column before the other players.

## Finale Results of the LPT

Here are the final results of the LPT Bingo :

### Poule 1

![Poule 1 Grid](./Images/LPT_Grille_Poule_1.png "Poule 1 Grid")

### Poule 2

![Poule 2 Grid](./Images/LPT_Grille_Poule_2.png "Poule 2 Grid")

### Poule Finale

![Poule Finale Grid](./Images/LPT_Grille_Poule_Finale.png "Poule Finale Grid")

## Technologies used : React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
