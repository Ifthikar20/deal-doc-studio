import { useEffect, useRef } from "react";

interface ClientCanvasProps {
  clientId: number;
  clientName: string;
}

export const ClientCanvas = ({ clientId, clientName }: ClientCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const width = canvas.width;
    const height = canvas.height;

    // Generate unique colors based on client ID and name
    const seed = clientId * 1000 + clientName.length;
    const hue1 = (seed * 137.508) % 360;
    const hue2 = (hue1 + 60) % 360;
    const hue3 = (hue1 + 120) % 360;

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, `hsl(${hue1}, 70%, 60%)`);
    gradient.addColorStop(0.5, `hsl(${hue2}, 70%, 55%)`);
    gradient.addColorStop(1, `hsl(${hue3}, 70%, 50%)`);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Generate unique pattern based on client
    const patternType = clientId % 4;

    ctx.globalAlpha = 0.3;
    ctx.fillStyle = "white";

    switch (patternType) {
      case 0: // Circles
        for (let i = 0; i < 8; i++) {
          const x = ((seed * (i + 1) * 17) % width);
          const y = ((seed * (i + 1) * 23) % height);
          const radius = 20 + ((seed * (i + 1)) % 40);
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
        break;

      case 1: // Rectangles
        for (let i = 0; i < 6; i++) {
          const x = ((seed * (i + 1) * 13) % (width - 60));
          const y = ((seed * (i + 1) * 19) % (height - 60));
          const w = 40 + ((seed * (i + 1)) % 60);
          const h = 40 + ((seed * (i + 2)) % 60);
          ctx.fillRect(x, y, w, h);
        }
        break;

      case 2: // Triangles
        for (let i = 0; i < 5; i++) {
          const x = ((seed * (i + 1) * 11) % width);
          const y = ((seed * (i + 1) * 17) % height);
          const size = 30 + ((seed * (i + 1)) % 50);
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + size, y);
          ctx.lineTo(x + size / 2, y - size);
          ctx.closePath();
          ctx.fill();
        }
        break;

      case 3: // Lines
        ctx.lineWidth = 8;
        ctx.strokeStyle = "white";
        for (let i = 0; i < 10; i++) {
          const x1 = ((seed * (i + 1) * 7) % width);
          const y1 = ((seed * (i + 1) * 11) % height);
          const x2 = ((seed * (i + 2) * 13) % width);
          const y2 = ((seed * (i + 2) * 17) % height);
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
        break;
    }

    // Add overlay gradient for depth
    ctx.globalAlpha = 0.2;
    const overlayGradient = ctx.createRadialGradient(
      width / 2,
      height / 2,
      0,
      width / 2,
      height / 2,
      width
    );
    overlayGradient.addColorStop(0, "rgba(255, 255, 255, 0.3)");
    overlayGradient.addColorStop(1, "rgba(0, 0, 0, 0.2)");
    ctx.fillStyle = overlayGradient;
    ctx.fillRect(0, 0, width, height);
  }, [clientId, clientName]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={200}
      className="w-full h-full object-cover"
    />
  );
};
