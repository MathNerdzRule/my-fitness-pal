export const lookupUPC = async (barcode) => {
  try {
    const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
    const data = await response.json();

    if (data.status === 1) {
      const p = data.product;
      const n = p.nutriments;
      
      // Open Food Facts provides data per 100g by default.
      // We want to prioritize 'per serving' if the data exists.
      
      const servingQty = p.serving_quantity || 100; // in grams
      const ratio = servingQty / 100;

      const calories = Math.round(
        n['energy-kcal_serving'] || 
        (n['energy-kcal_100g'] * ratio) || 
        ((n['energy_100g'] / 4.184) * ratio) || 0
      );

      const protein = parseFloat(
        n.proteins_serving || 
        (n.proteins_100g * ratio) || 0
      ).toFixed(1);

      const carbs = parseFloat(
        n.carbohydrates_serving || 
        (n.carbohydrates_100g * ratio) || 0
      ).toFixed(1);

      const fat = parseFloat(
        n.fat_serving || 
        (n.fat_100g * ratio) || 0
      ).toFixed(1);

      return {
        name: p.product_name || "Unknown Product",
        calories: Number(calories),
        protein: Number(protein),
        carbs: Number(carbs),
        fat: Number(fat),
        serving_size: p.serving_size || `${servingQty}g`,
        brand: p.brands || ""
      };
    }
    return null;
  } catch (error) {
    console.error("UPC Lookup failed", error);
    return null;
  }
};
