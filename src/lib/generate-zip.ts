import { saveAs } from 'file-saver';
import jszip from 'jszip';
import type { QueueItem } from './types';
import { slugify } from './helpers';
import { presets } from './presets';

type JSZip = typeof jszip;

//
// Zip assets

async function generateFolders(zip: JSZip) {
  zip.folder('proper');
  zip.folder('proper/lib');
  zip.folder('proper/manifest');
}

async function generatePresets(zip: JSZip) {
  for (const preset of presets) {
    const data = await fetch(preset.file).then((res) => res.text());
    zip.file(!preset.dir ? `proper/${preset.name}` : `proper/${preset.dir}/${preset.name}`, data);
  }
}

async function createManifestFile(name: string, items: QueueItem[], zip: JSZip) {
  if (items.length) {
    const names = items.map((item) => {
      if (item.origin === 'mas') {
        return `${item.id}::${slugify(item.name)}`;
      } else {
        return item.id;
      }
    });
    zip.file(`proper/manifest/${name}`, names.join('\n'));
  }
}

async function generateManifests(queue: QueueItem[], zip: JSZip) {
  const npmItems = queue.filter((item) => item.origin === 'npm');
  const composerItems = queue.filter((item) => item.origin === 'composer');
  const masItems = queue.filter((item) => item.origin === 'mas');
  const caskItems = queue.filter((item) => item.origin === 'cask');
  const brewItems = queue.filter((item) => item.origin === 'homebrew');

  createManifestFile('npm', npmItems, zip);
  createManifestFile('composer', composerItems, zip);
  createManifestFile('apps', masItems, zip);
  createManifestFile('casks', caskItems, zip);
  createManifestFile('brews', brewItems, zip);
}

async function compileZip(zip: JSZip) {
  zip.generateAsync({ type: 'blob' }).then(function (content) {
    saveAs(content, 'proper.zip');
  });
}

//
// Compile into zip
export const generateZip = async (queue: QueueItem[]) => {
  // New Zip
  const zip = new jszip();

  try {
    await generateFolders(zip);
    await generatePresets(zip);
    await generateManifests(queue, zip);
    await compileZip(zip);
  } catch (error) {
    console.log(error);
  }
};
