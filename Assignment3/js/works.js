const imageData = [
  {
      defaultImage: './assets/images/Asset 38.png',
      hoverImage: './assets/images/Asset 44.png',
      link: 'https://youtu.be/QqhkvvPcl1M'
  },
  {
      defaultImage: './assets/images/BIjViH.tif.png',
      hoverImage: './assets/images/BIjViH.tif (2).png',
      link: 'https://youtu.be/-Vr-0otHNi4'
  },
  {
      defaultImage: './assets/images/0O8O1T.tif.png',
      hoverImage: './assets/images/0O8O1T.tif (2).png',
      link: 'https://youtu.be/7HU37EsPd9s'
  },
  {
      defaultImage: './assets/images/Asset 37.png',
      hoverImage: './assets/images/Asset 43.png',
      link: 'https://youtu.be/GuO9nMlSNnI'
  },
  {
      defaultImage: './assets/images/Asset 36.png',
      hoverImage: './assets/images/Asset 42.png',
      link: 'https://youtu.be/Zn9AqfbOx58'
  },
  {
      defaultImage: './assets/images/GljJfo.tif.png',
      hoverImage: './assets/images/GljJfo.tif (2).png',
      link: 'https://youtu.be/ZgeECpJZmQI'
  },
];

const imageContainer = document.getElementById('imageContainer');
imageData.forEach(item => {
  const imageItem = document.createElement('div');
  imageItem.className = 'image-item';
  imageItem.onclick = () => window.location.href = item.link;

  const defaultImg = document.createElement('img');
  defaultImg.src = item.defaultImage;
  defaultImg.alt = '默认图片';
  defaultImg.className = 'default-image';

  const hoverImg = document.createElement('img');
  hoverImg.src = item.hoverImage;
  hoverImg.alt = '悬浮图片';
  hoverImg.className = 'hover-image';

  imageItem.appendChild(defaultImg);
  imageItem.appendChild(hoverImg);

  imageContainer.appendChild(imageItem);
});