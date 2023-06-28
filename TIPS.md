### Les couleurs

```scss
// COULEURS PRÉDÉFINIES
var(--grey-600);
var(--white)

// EXEMPLES
body {
  background-color: var(--primary-600);
	border: 1px solid var(--grey-200);
	color: var(--white);
}
```

### La typo

```scss
// IMPORT AU DÉBUT DU FICHIER
@use "../../styles/typography" as *;

// EXPEMPLES
h1{
	// $weight est optionnel	
	@include title("sm", $weight: 500);
	
// Vous pouvez écrire juste ça si vous n'avez pas besoin de la graisse
	@include title("sm");
}

p{
	// idem pour text
	@include text("md");
}

```

### Les boutons

```scss
// IMPORT AU DÉBUT DU FICHIER
@use "../../styles/button" as *;

// EXEMPLE
// La taille est sm, md, lg, xl ou 2xl
// $style peut être : solid, outline, link
a{
	@include button("lg", $color: "primary", $style: "solid");
}

```

```jsx
// Ou directement avec une class
<button className="button-lg-primary-solid">
	<i className="fi fi-rr-plus" />
	Ajouter une idée
</button>
```


### Breakpoints

sm: 576px,
**md: 768px,**
lg: 992px,
xl: 1200px,
xxl: 1400px