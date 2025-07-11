import localFont from 'next/font/local';

export const pretendard = localFont({
  src: './PretendardVariable.woff2',
  display: 'fallback',
  weight: '45 920',
});

export const gmarket = localFont({
  src: [
    {
      path: './GmarketSansBold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './GmarketSansMedium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './GmarketSansLight.woff2',
      weight: '300',
      style: 'normal',
    },
  ],
  display: 'fallback',
  variable: '--font-gmarket',
});
