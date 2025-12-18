function getTextPositionData(selector, index = 0) {
  const element = document.querySelector(selector);

  if (!element) {
    console.error("Element not found");
    return null;
  }

  // 1. Get Geometry (X, Y, Width, Height)
  const rect = element.getBoundingClientRect();

  // 2. Get Rotation (Parse CSS Transform Matrix)
  const style = window.getComputedStyle(element);
  const transform = style.transform || style.webkitTransform || style.mozTransform;
  
  let rotation = 0;
  if (transform !== 'none') {
    // Transform returns a matrix like "matrix(0.866, 0.5, -0.5, 0.866, 0, 0)"
    const values = transform.split('(')[1].split(')')[0].split(',');
    const a = values[0];
    const b = values[1];
    // Calculate angle in degrees
    rotation = Math.round(Math.atan2(b, a) * (180 / Math.PI));
  }

  // 3. Construct the JSON object
  const data = {
    name: `Item_${index}_text`,
    type: "text",
    x: parseFloat(rect.x.toFixed(2)),       // X position relative to viewport
    y: parseFloat(rect.y.toFixed(2)),       // Y position relative to viewport
    width: parseFloat(rect.width.toFixed(2)),
    height: parseFloat(rect.height.toFixed(2)),
    rotation: rotation,
    text: element.innerText.trim()          // The actual text content
  };

  return data;
}

// --- USAGE ---
// Replace '.your-text-class' with the actual HTML class or ID of your text
const result = getTextPositionData('.your-text-class'); 

console.log(JSON.stringify(result, null, 2));