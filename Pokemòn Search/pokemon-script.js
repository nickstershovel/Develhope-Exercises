
    async function getPokemonInformation() {
        try{
            const name = document.getElementById("name").value
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            const pokemonData = await response.json();
            const { abilities, base_experience } = pokemonData;;
            document.getElementById("abilities").innerText=`Abilità: ${abilities.map(x => x.ability.name).join()}\n`
            document.getElementById("abilities").innerText+=`Base exp: ${base_experience}\n`
            
            const moreInfoButton = document.createElement("button");
            moreInfoButton.innerText = "More info";
            moreInfoButton.onclick = async () => {
                try {
                    const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonData.id}`);
                    const speciesData = await speciesResponse.json();
                    const { egg_groups, color, shape } = speciesData;
                    // Add the additional information to the page
                    document.getElementById("abilities").innerText += `Egg group: ${egg_groups.map(x => x.name).join()}\n`;
                    document.getElementById("abilities").innerText += `Color: ${color.name}\n`;
                    document.getElementById("abilities").innerText += `Shape: ${shape.name}\n`;
                    } catch (ex) {
                    console.log(ex);
                    }
                    }
                    document.getElementById("more-info").appendChild(moreInfoButton);
                    } catch (ex) {
                    console.log(ex);
                    }
                    }
                    document.getElementById("submit").onclick = () =>{getPokemonInformation()}