import React from 'react';

export function A11yStatement() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        width: '60%',
        margin: '36px',
      }}
    >
      <h1> Saavutettavuusseloste </h1>
      <p>
        Tämä saavutettavuusseloste koskee Ubigu Oy:n tarjoamaa Kartalla
        -sovellusta.
      </p>
      <h2>Palvelun saavutettavuuden nykytila</h2>
      <p>
        Palvelu täyttää kansainvälisen WCAG 2.1 saavutettavuussäädöksen tason
        AA-vaatimukset osittain. Palvelussa on pieniä puutteita
        saavutettavuuteen liittyen, jotka on kuvattu alla.{' '}
      </p>
      <h3> Puutteet saavutettavuudessa</h3>
      <ul>
        <li>
          <p>
            Responsiivisuusongelmia: Palvelun käyttöliittymät ja
            toiminnallisuudet eivät toimi eri päätelaitteilla ja tuetuilla
            selaimilla kriteeristön asettamissa rajoissa. Erityisesti
            karttapohjaisissa kysymyksissä on runsaasti responsiivisuuteen
            liittyviä ongelmia. (WCAG 1.4.10 Responsiivisuus)
          </p>
        </li>
        <li>
          <p>
            Heikkoja kontrasteja: Palvelussa saattaa olla heikkoja kontrasteja
            kuvissa ja kartoissa, joita hyödynnetään kyselyissä. (WCAG 1.4.3
            Kontrasti, minimi, 1.4.11 Ei-tekstimuotoisen sisällön kontrasti)
          </p>
        </li>
        <li>
          <p>
            Liian pieni kosketusalue: Mobiiliversiossa interaktiivisten
            elementtien kosketusalueet ovat liian pienet ja vaikeuttavat
            palvelun käyttämistä. (WCAG 3.2.1 Kohdistaminen)
          </p>
        </li>
      </ul>
      <h3> Lainsäädännön ulkopuoliset puutteet </h3>
      <ul>
        <li>
          <p>
            Kartat, joita ei ole tarkoitettu navigointikäyttöön (esimerkiksi
            sää- tai maastokartat)
          </p>
        </li>
      </ul>
    </div>
  );
}
