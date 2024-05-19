# Next-Blog

Blog suivant l'architecture **JAMstack**, développé avec **Nextjs** et
**Contentful**.

SEO, images optimisées automatiquement, génération statique des assets.

### Rapport Lighthouse

![Screenshot_4](https://user-images.githubusercontent.com/48062996/101624148-d1992480-3a19-11eb-87aa-258b638df074.jpg)

### Homepage

![Screenshot_1](https://user-images.githubusercontent.com/48062996/101618821-c55d9900-3a12-11eb-820f-a8742334d24e.jpg)

### Article

![Screenshot_2](https://user-images.githubusercontent.com/48062996/101619175-30a76b00-3a13-11eb-9c36-13bb7f0b6c01.jpg)

## Installation

1.  Clonez ce repository et installez les dépendances

```bash
$ git clone https://github.com/NoailletasJordan/personnal-blog.git
$ cd personnal-blog
$ npm install
```

2.  Créez un fichier **.env** et entrez vos variables Contentful

```
CONTENTFUL_SPACE=<votre-variable>
CONTENTFUL_ACCESS_TOKEN=<votre-variable-articles-publiés>
CONTENTFUL_DRAFT_PREVIEW_TOKEN=<votre-variable-article-draft>
```

3.  Démarrez le serveur local

```
$ npm run dev
```

Les pages publiées sont en SSG

Les pages draft sont accessibles à l'adresse: [fr|en]/draft/id-de-la-page et
rendues en SSR pour éviter le besoin d'un redéploiement
