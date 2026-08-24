
function FilterSidebar({
  categories,
  selectedCategories,
  onToggleCategory,
  selectedPrivacy,
  onTogglePrivacy,
  savedByFilter,
  onSavedByChange,
  selectedStatus,
  onToggleStatus,
}) {
  return (
    <div className="bg-paper rounded-xl items-center justify-center py-3 px-3">
    <h2 className="font-display text-ink text-lg mt-1 mb-3">Filter Spots</h2>
    <div className="flex flex-col gap-10">
        
        {/* category */}
        <div>
            <p className="font-display text-sm text-rosewood mb-2">Category</p>
            {categories.map(category => (
            <label key={category} className="flex items-center gap-2 text-sm mb-1">
                <input
                type="checkbox"
                checked={selectedCategories.has(category)}
                onChange={() => onToggleCategory(category)}
                />
                {category}
            </label>
            ))}
        </div>

        {/* wants to visit/visited */}
        <div>
            <p className="font-display text-sm text-rosewood mb-2">Status</p>
            {[
            { value: "visited", label: "Visited" },
            { value: "wantsToVisit", label: "Wants to visit" },
            ].map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2 text-sm mb-1">
                <input
                type="checkbox"
                checked={selectedStatus.has(value)}
                onChange={() => onToggleStatus(value)}
                />
                {label}
            </label>
            ))}
        </div>

        {/* privacy level */}
        <div>
            <p className="font-display text-sm text-rosewood mb-2">Privacy</p>
            {["PRIVATE", "FRIENDS"].map(level => (
            <label key={level} className="flex items-center gap-2 text-sm mb-1">
                <input
                type="checkbox"
                checked={selectedPrivacy.has(level)}
                onChange={() => onTogglePrivacy(level)}
                />
                {level}
            </label>
            ))}
        </div>

        {/* saved by */}
        <div>
            <p className="font-display text-sm text-rosewood mb-2">Saved by</p>
            <select value={savedByFilter} onChange={(e) => onSavedByChange(e.target.value)} className="w-full border rounded-lg px-2 py-1 text-sm">
            <option value="all">Everyone</option>
            <option value="me">Me</option>
            <option value="friends">Friends</option>
            </select>
        </div>

    </div>
      
    </div>
  );
}

export default FilterSidebar;