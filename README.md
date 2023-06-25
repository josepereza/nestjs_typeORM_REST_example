# NestJS_TypeORM_REST_example

Przykład wykorzystania NestJS do API REST opartego na TypeORM. Projekt zawiera dokumentację źródeł.

# Krótko o NestJS

Jest to framework do budowania aplikacji API REST w języku TypeScript (oczywiście da się go wykorzystać także do budowania monolitów z renderowaniem po stronie serwera). Główną zaletą frameworka jest jego podomieństwo do Angulara oraz porz ądek. Nest narzuca strukturę katalogów, konwencję nazw plików oraz podział aplikacji na fragmenty. Dzięki temu aplikacje tworzone w NestJS mają podobną strukturę. Dzięki temu programiści mogą szybciej wdrożyć się w projekt. NestJS pozwala tworzyć różnego rodzaju aplikacje serwerowe, a dzięki wygodnemu CLI praca staje się lekka i wydajna.

Co warte podkreślenia, autorem frameworka jest Kamil Myśliwiec https://kamilmysliwiec.com/

Strona projektu NestJS: https://nestjs.com/

# Instalacja

Aby pobrać tę aplikację, wykonaj poniższe polecenia. Oczywiście w systemie musi być zasinstalowany Git.

```
git clone https://git.wmtstw.eu/skyer/NestJS_TypeORM_REST_example.git

cd NestJS_TypeORM_REST_example

npm install
```

Teraz otwórz sklonowany projekt w ulubionym IDE$, np. Visual Studio Code.

## Ustawienie zmiennej środowiskowej

W zależności od tej zmiennej, aplikacja użyje odpowiedniego pliku konfiguracyjnego.

```
Windows (CMD): set NODE_ENV=development
Linux/MacOS: export NODE_ENV=development
```

W tym przypadku wykorzystany zostanie plik *development.env*.

## Konfiguracja połączenia z bazą

W *src/common/envs* znajdują się dwa pliki konfiguracyjne. Otwórz do edycji plik **development.env** i popraw w nim parametry konfiguracyjne dla bazy danych MySQL:

```
PORT=3000
DATABASE_HOST=localhost
DATABASE_NAME=nazwa_bazy
DATABASE_USER=uzytkownik
DATABASE_PASSWORD=haslo
DATABASE_PORT=3306
```
Zapisz plik i uruchom serwer poleceniem:

```
npm run start:dev
```

Zajrzyj do [dokumentacji](/docs/README.md), aby zapoznać sie krok po kroku z tworzeniem oprogramowania w NestJS.

*Życzę miłej Lektury*

Leszek Klich

leszek.klich@gmail.com