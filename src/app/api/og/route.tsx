import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const dynamic = 'force-static';

const size = {
  width: 1200,
  height: 630,
};

// Light theme tokens from tailwind.config.ts and globals.css, the image cannot use Tailwind classes
const colors = {
  paper: '#fbfbf9',
  ink: '#1d1d16',
  inkSoft: '#5b5b4b',
  accent: '#5ea500',
};

const poppinsRegular = await readFile(join(process.cwd(), 'src/assets/fonts/Poppins-Regular.ttf'));
const poppinsSemiBold = await readFile(
  join(process.cwd(), 'src/assets/fonts/Poppins-SemiBold.ttf'),
);

const logo = await readFile(join(process.cwd(), 'public/logo.svg'), 'base64');

/**
 * Route handler generating an Open Graph image
 */
export async function GET() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 80,
        backgroundColor: colors.paper,
        color: colors.ink,
        fontFamily: 'Poppins',
      }}>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/svg+xml;base64,${logo}`} width={88} height={88} alt='' />
        <span style={{ fontSize: 44, fontWeight: 600, letterSpacing: -1 }}>NinjaFood</span>
      </div>

      {/* Title and description */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <span style={{ fontSize: 72, fontWeight: 600, lineHeight: 1.1, letterSpacing: -2 }}>
          Street food rychlostí ninji
        </span>
        <span style={{ fontSize: 32, lineHeight: 1.45, color: colors.inkSoft, maxWidth: 920 }}>
          Burgery, ramen, bowly a wrapy inspirované americkou a asijskou kuchyní. S rozvozem po
          celém Hradci Králové.
        </span>
      </div>

      {/* Accent line */}
      <div
        style={{
          display: 'flex',
          width: 120,
          height: 8,
          borderRadius: 9999,
          backgroundColor: colors.accent,
        }}
      />
    </div>,
    {
      ...size,
      fonts: [
        { name: 'Poppins', data: poppinsRegular, weight: 400, style: 'normal' },
        { name: 'Poppins', data: poppinsSemiBold, weight: 600, style: 'normal' },
      ],
    },
  );
}
