export const lookupUPC = async (barcode) => {
  try {
    const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
    const data = await response.json();

    if (data.status === 1) {
      const p = data.product;
      return {
        name: p.product_name || "Unknown Product",
        calories: Math.round(p.nutriments['energy-kcal_100g'] || (p.nutriments['energy_100g'] / 4.184) || 0),
        protein: p.nutriments.proteins_100g || 0,
        carbs: p.nutriments.carbohydrates_100g || 0,
        fat: p.nutriments.fat_100g || 0,
        serving_size: p.serving_size || "100g",
        brand: p.brands || ""
      };
    }
    return null;
  } catch (error) {
    console.error("UPC Lookup failed", error);
    return null;
  }
};
