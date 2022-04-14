import React from 'react';
import axios from 'axios';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import { useEffect, useState } from 'react';
const excludedItems = [
  "item_grandmasters_glaive",
  "item_satchel",
  "item_ultimate_scepter_roshan",
  "item_aghanims_shard_roshan",
  "item_river_painter",
  "item_river_painter2",
  "item_river_painter3",
  "item_river_painter4",
  "item_river_painter5",
  "item_river_painter6",
  "item_river_painter7",
  "item_mutation_tombstone",
  "item_pocket_tower",
  "item_pocket_roshan",
  "item_greater_mango",
  "item_mechanical_arm",
  "item_horizon",
  "item_dimensional_doorway",
  "item_wizard_glass",
  "item_gloves_of_travel",
  "item_venom_gland",
  "item_gladiator_helm",
  "item_ancient_perseverance",
  "item_star_mace",
  "item_warhammer",
  "item_oakheart",
  "item_vengeances_shadow",
  "item_overflowing_elixir",
  "item_assassins_dagger",
  "item_sample_picker",
  "item_icarus_wings",
  "item_light_robes",
  "item_fortitude_ring"
]
function ItemsList() {
  const [items, setItems] = useState([])
  const [names, setNames] = useState([])
  const [opened, setOpened] = useState([])

  useEffect(() => {
    (async () => {

      const { data } = await axios.get("http://localhost:5000/datafeed/itemlist?language=brazilian")
      setItems(data?.result?.data?.itemabilities.filter(x => !x.name.includes("recipe") && !excludedItems.includes(x.name)))


    })()
  }, [])


  const itemsLoja = items.filter(x => x.neutral_item_tier === -1)
  const itemsNeutral1 = items.filter(x => x.neutral_item_tier === 0)
  const itemsNeutral2 = items.filter(x => x.neutral_item_tier === 1)
  const itemsNeutral3 = items.filter(x => x.neutral_item_tier === 2)
  const itemsNeutral4 = items.filter(x => x.neutral_item_tier === 3)
  const itemsNeutral5 = items.filter(x => x.neutral_item_tier === 4)

  const itemsGroup = [
    itemsLoja,
    itemsNeutral1,
    itemsNeutral2,
    itemsNeutral3,
    itemsNeutral4,
    itemsNeutral5,
  ]

  return (
    <div>
      {itemsGroup.map((items, tier) => (
        <>
          <h1 onClick={() => {
            if (opened.includes(`${tier}`)) setOpened(opened.filter(x => x !== `${tier}`))
            else setOpened(opened.concat(`${tier}`))
          }}> Tier {tier} </h1>
          {!opened.includes(`${tier}`) ? null :
            <ul>
              {items.map(item => (
                <li>
                  <label>
                    <input type="checkbox" name={item.name} onChange={() => {
                      if (names.includes(item.name)) setNames(names.filter(x => x !== item.name))
                      else setNames(names.concat(item.name))
                    }} checked={names.includes(item.name)} />
                    <img src={`https://cdn.dota2.com/apps/dota2/images/items/${item.name.replace("item_", "")}_lg.png`} /> {item.name}

                    <pre>
                      {JSON.stringify(item, null, 4)}
                    </pre>

                  </label>
                </li>
              ))}
            </ul>}
        </>
      ))}
      <pre>
        {JSON.stringify(names, null, 4)}
      </pre>
    </div >
  )

}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ItemsList />
    </ChakraProvider>
  );
}

export default App;
