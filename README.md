# InkFlater Tattoo

Moderný prezentačný web tetovacieho štúdia **InkFlater** v Raslaviciach.

Živý web: https://caseycz.github.io/InkFlater/

## Aktuálna verzia

**0.3.0** – nový editorial / art-direction redesign.

Web už nevychádza z pôvodnej klasickej tattoo šablóny. Aktuálna verzia používa výraznú typografiu, asymetrické rozloženie, kontrast svetlej a čiernej plochy a vlastné fotografie InkFlater.

## Čo je nové

- nový editorial hero s veľkým nápisom `INK / FLATER`,
- tri hero fotografie s plynulým náhodným pohybom po celej úvodnej ploche,
- fotografie sa môžu navzájom prekrývať a meniť natočenie,
- hlavná typografia zostáva nad fotografiami kvôli čitateľnosti,
- pohyb je na mobiloch a pri `prefers-reduced-motion` vypnutý,
- responzívne rozloženie pre desktop, tablet aj telefón,
- výraznejšie a väčšie logo v pevnom headeri,
- navigácia s aktívnou sekciou,
- portfólio s 8 realizáciami,
- fullscreen lightbox galéria,
- hover animácie a plynulé reveal efekty,
- profil Adama Kučinského,
- sekcia procesu od nápadu po tetovanie,
- informácie pre prvé tetovanie,
- kontakt, telefón, e-mail, Instagram, Facebook a Google Maps,
- SEO metadata, Open Graph, sitemap a robots.txt,
- Schema.org `TattooParlor`,
- čistý vanilla JavaScript bez jQuery,
- automatický deployment cez GitHub Actions na GitHub Pages.

## Technológie

- HTML5
- moderné CSS
- Vanilla JavaScript
- CSS Grid / responsive breakpoints
- Web Animations API
- Intersection Observer
- GitHub Actions
- GitHub Pages

## Deployment

Publikovanie prebieha automaticky po každom pushi do vetvy:

`Master`

Workflow:

`.github/workflows/pages.yml`

Výsledná stránka:

https://caseycz.github.io/InkFlater/

## Zálohy

Pred väčšími zmenami boli vytvorené samostatné záložné vetvy:

- `backup-before-redesign-2026-09-22` – pôvodná verzia webu pred redesignom,
- `backup-redesign-v0.2.0` – prvý tmavý redesign pred prechodom na editorial verziu 0.3.0.

Díky tomu je možné sa k obom starším variantom kedykoľvek vrátiť.

## Štruktúra projektu

```text
InkFlater/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── project.js
├── images/
│   ├── banner/
│   ├── items/
│   └── main/
├── fonts/
├── .github/
│   └── workflows/
│       └── pages.yml
├── robots.txt
├── sitemap.xml
├── VERSION
└── README.md
```

## Kontakt

**InkFlater-Tattoo Raslavice**  
Toplianska 709/54  
086 41 Raslavice, Slovensko

- Instagram: https://www.instagram.com/ink_flater/
- Facebook: https://www.facebook.com/inkFlater/
- Telefón: +421 949 698 018
- E-mail: adam.kucinsky@gmail.com
