import { useState } from "react";
import Item from "./Item.js";

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItems,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState("packed");

  let sortetItems;
  if (sortBy === "input") sortetItems = items;
  if (sortBy === "description")
    sortetItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortetItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      {!items.length ? null : (
        <ul>
          {sortetItems.map((item) => (
            <Item
              item={item}
              key={item.id}
              onDeleteItem={onDeleteItem}
              onToggleItems={onToggleItems}
            />
          ))}
        </ul>
      )}
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}
