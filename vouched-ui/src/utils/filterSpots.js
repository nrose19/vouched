//reducing DRY for filtering spots.

export function filterSpots(spots, { selectedCategories, selectedPrivacy, savedByFilter, selectedStatus, userId, friendIds }) {
  return spots.filter(spot => {
    const categoryMatches = selectedCategories.size === 0 || selectedCategories.has(spot.category);
    const privacyMatches = selectedPrivacy.size === 0 || selectedPrivacy.has(spot.privacyLevel);
    const savedByMatches =
      savedByFilter === "all" ||
      (savedByFilter === "me" && spot.ownerId === userId) ||
      (savedByFilter === "friends" && friendIds.has(spot.ownerId));
    const statusMatches =
      selectedStatus.size === 0 ||
      [...selectedStatus].some(status => spot[status]);
    return categoryMatches && privacyMatches && savedByMatches && statusMatches;
  });
}