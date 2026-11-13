## Jak używać

Otwórz `index.html` w przeglądarce. Wpisz dystans jednego przejazdu, liczbę przejazdów, średnie spalanie, cenę paliwa, liczbę osób w aucie i ewentualne dodatkowe koszty (autostrada, parking). Wynik na osobę i za cały samochód przelicza się na bieżąco.

Bieżące dane możesz zapisać jako preset pod własną nazwą, a potem wczytać lub usunąć. Presety są przechowywane w `localStorage` przeglądarki.

## Struktura projektu

```
index.html          struktura strony
css/
  base.css          reset i ustawienia podstawowe
  theme.css         kolory, czcionki, motyw jasny i ciemny
  layout.css        układ strony i nagłówek
  form.css          pola formularza i przyciski
  result.css        karta z wynikiem
  presets.css       sekcja presetów
js/
  utils.js          pomocnicze funkcje (formatowanie, odczyt pól)
  storage.js        zapis presetów w localStorage
  calculator.js     obliczenia i obsługa formularza
  presets.js        lista presetów (zapis, wczytanie, usuwanie)
  main.js           start aplikacji
```

Skrypty ładują się w kolejności z `index.html` i nie wymagają budowania ani instalacji.
