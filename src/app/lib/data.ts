interface Film {
    title: string;
    episode_id: number;
    director: string;
    characters: string[];
}

interface FilmsRes {
    map: any;
    results: Film[];
}

interface Character {
    name: string;
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

export async function getFilmsDetail(){
    try {
        const filmsResponse: FilmsRes = await getFilmsData();
        const filmsDetail = await Promise.all(filmsResponse.results?.map(async (f: Film) => {
            const characters = await getCharacterData(f.characters);
            return {
                filmName: f.title,
                id: f.episode_id,
                director: f.director,
                characters,
            };
        }) || []);
        console.log(filmsDetail)
        return filmsDetail;
    } catch (error) {
        console.error('Error: ', error);
        throw new Error('Failed to fetch detail data');
    }
}



