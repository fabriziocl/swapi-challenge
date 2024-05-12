interface Film {
    title: string;
    episode_id: number;
    director: string;
    characters: string[];
}

interface FilmDetail {
    filmName: string;
    episode_id: number;
    director: string;
    characters: Character[];
}

interface FilmsRes {
    map: any;
    results: Film[];
}

interface Character {
    name: string;
    url: string;
    characterNumber: number;
}


export async function getFilmsData(){
      try {
        const data = await fetch("https://swapi.dev/api/films/")
        const films = await data.json()
        const sentData = await films.results
        //  console.log(sentData)
        return sentData
    } catch (error) {
        console.error('Error: ', error)
        throw new Error('Failed to fetch films data')
    }
}

export async function getFilmsCard() {
    try {
        const filmsResponse: FilmsRes = await getFilmsData();
        const sentData = filmsResponse.map((f: Film) => {
            return {
                filmName: f.title,
                id: f.episode_id
            };
        });
        // console.log(sentData)
        return sentData;
    } catch (error) {
        console.error('Error: ', error);
        throw new Error('Failed to fetch cards data');
    }
}


export async function getCharacterData(characterUrls: string[]): Promise<string[]> {
    const characterNames: string[] = [];

    for (const characterUrl of characterUrls) {
        try {
            const response = await fetch(characterUrl);
            const characterData: Character = await response.json();
            characterNames.push(characterData.name);
        } catch (error) {
            console.error('Error: ', error);
            throw new Error('Failed to fetch character data')
        }
    }

    return characterNames;
}

export async function getCharacter(url: string): Promise<Character> {
    try {
        const response = await fetch(url);
        const jsonRes = await response.json();
        const characterNumberMatch = url.match(/\/(\d+)\/$/);
        const characterNumber = parseInt(characterNumberMatch![1]);

        const character: Character = {
            name: jsonRes.name,
            url: jsonRes.url,
            characterNumber: characterNumber
        };
        return character;
    } catch (error) {
        console.error('Error: ', error);
        throw new Error('Failed to fetch character data');
    }
}

export async function getFilmsDetail(id: number) {
    try {
        const response = await fetch(`https://swapi.dev/api/films/${id}`)
        const jsonRes = await response.json()

        const characterPromises: Promise<Character>[] = jsonRes.characters.map((characterUrl: string) => getCharacter(characterUrl));
        const characters = await Promise.all(characterPromises);

        const filmDetail: FilmDetail = {
            filmName: jsonRes.title,
            episode_id: jsonRes.episode_id,
            director: jsonRes.director,
            characters: characters
        };

        // console.log(filmDetail)
        return filmDetail
    } catch (error) {
        console.error('Error: ', error);
        throw new Error('Failed to fetch film detailed data')
    }
}