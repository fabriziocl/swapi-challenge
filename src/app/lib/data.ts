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

interface CharDetail {
    name: string;
    eye_color: string,
    birth_year: string,
    hair_color: string;
    height: string;
    skin_color: string;
    mass: string;
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
        console.error('Error: ', error)
        throw new Error('Failed to fetch cards data')
    }
}


export async function getCharacterData(characterUrls: string[]): Promise<string[]> {
    const characterNames: string[] = [];

    for (const characterUrl of characterUrls) {
        try {
            const response = await fetch(characterUrl)
            const characterData: Character = await response.json();
            characterNames.push(characterData.name);
        } catch (error) {
            console.error('Error: ', error)
            throw new Error('Failed to fetch character data')
        }
    }

    return characterNames;
}

export async function getCharacter(url: string): Promise<Character> {
    try {
        const response = await fetch(url)
        const jsonRes = await response.json()
        const characterNumberMatch = url.match(/\/(\d+)\/$/)
        const characterNumber = parseInt(characterNumberMatch![1])

        const character: Character = {
            name: jsonRes.name,
            url: jsonRes.url,
            characterNumber: characterNumber
        };
        return character;
    } catch (error) {
        console.error('Error: ', error)
        throw new Error('Failed to fetch character data')
    }
}

export async function getFilmsDetail(id: number) {
    try {
        const response = await fetch(`https://swapi.dev/api/films/${id}`)
        const jsonRes = await response.json()

        const characterPromises: Promise<Character>[] = jsonRes.characters.map((characterUrl: string) => getCharacter(characterUrl))
        const characters = await Promise.all(characterPromises)

        const filmDetail: FilmDetail = {
            filmName: jsonRes.title,
            episode_id: jsonRes.episode_id,
            director: jsonRes.director,
            characters: characters
        };

        // console.log(filmDetail)
        return filmDetail
    } catch (error) {
        console.error('Error: ', error)
        throw new Error('Failed to fetch film detailed data')
    }
}


//CORREGIR PARA QUE SOLO TRAIGA LA INFO NECESARIA
export async function getAllCharacters() {
    try {
        let allCharacters: any = [];
        let url = "https://swapi.dev/api/people"

        while(url) {
            const response = await fetch(url)
            const jsonRes = await response.json()

            const characters = jsonRes.results.map((char: any) => {
                const trimmedUrl = char.url.split('/').slice(-2, -1)[0]
                return {
                    ...char,
                    trimmedUrl
                };
            })
            allCharacters = allCharacters.concat(characters)

            url = jsonRes.next
        }
        // console.log(allCharacters)
        return allCharacters
    } catch (error) {
        console.error('Error: ', error)
        throw new Error('Failed to fetch all characters data')
    }
}

export async function getCharacterDetail(id: number){
    try {
        const response = await fetch(`https://swapi.dev/api/people/${id}`)
        const jsonres = await response.json()

        const charDetail : CharDetail = {
                name: jsonres.name,
                eye_color: jsonres.eye_color,
                birth_year: jsonres.birth_year,
                hair_color: jsonres.hair_color,
                height: jsonres.height,
                skin_color: jsonres.skin_color,
                mass: jsonres.mass,
            
        }
        // console.log(charDetail)
        return charDetail
    } catch (error) {
        console.error('Error: ', error)
        throw new Error('Failed to fetch character detailed data')
    }
}

export function checkData(data: any){
    return data !== "n/a" && data !== "unknown"
}