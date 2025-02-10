import React from 'react'
import Addinventory from './Add_inventory';
import Inventorylist from './Inventorylist';
export default function Inventory() {
    return (
        <>
            <div className='mb-3'>
                <ul className="flex justify-between set_padding">
                    <li>
                        <h4 className="font-bold  md:text-2xl sm:text-xl">
                            Inventory Management
                        </h4>
                    </li>

                    <li className="flex">
                        <Addinventory />
                    </li>
                </ul>
            </div>


            <div>
                <Inventorylist />
            </div>
        </>

    )
}
