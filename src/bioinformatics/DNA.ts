const randomElement = (values: any[]): any =>
  values[Math.floor(Math.random() * values.length)];

const randomNucleotide = () => randomElement(["A", "C", "G", "T"]);

export const randomDNA = (size: number) => () => {
  var result = [];
  while (!acceptableORFs(allORFs(result))) {
    result = Array.from({ length: size }, randomNucleotide);
  }
  return result;
};

const complementary =
  (sequenceType: "RNA" | "DNA") =>
  (nucleotide: string): string => {
    switch (nucleotide) {
      case "A":
        return sequenceType === "RNA" ? "U" : "T";
      case "C":
        return "G";
      case "G":
        return "C";
      case "T":
        return "A";
      default:
        throw Error(`Unknown nucleotide ${nucleotide}`);
    }
  };

export const toRNA = (dna: string[]): string[] => dna.map(complementary("RNA"));

export const toComplementary = (dna: string[]): string[] =>
  dna.map(complementary("DNA")).reverse();

export const toGC = (dna: string[]): number =>
  (dna.filter((n) => n === "G" || n === "C").length / dna.length) * 100;

export const toCodons = (dna: string[]): string[] => {
  var copy = [...dna];
  var codons = [];
  while (copy.length >= 3) {
    codons.push(copy.splice(0, 3).join(""));
  }
  return codons;
};

export const toAminoacid = (codon: string): string => {
  // First column
  if (["UUU", "UUC"].includes(codon)) {
    return "F";
  }
  if (["UUA", "UUG", "CUU", "CUC", "CUA", "CUG"].includes(codon)) {
    return "L";
  }
  if (["AUU", "AUC", "AUA"].includes(codon)) {
    return "I";
  }
  if (["AUG"].includes(codon)) {
    return "M";
  }
  if (["GUU", "GUC", "GUA", "GUG"].includes(codon)) {
    return "V";
  }
  // Second column
  if (["UCU", "UCC", "UCA", "UCG"].includes(codon)) {
    return "S";
  }
  if (["CCU", "CCC", "CCA", "CCG"].includes(codon)) {
    return "P";
  }
  if (["ACU", "ACC", "ACA", "ACG"].includes(codon)) {
    return "T";
  }
  if (["GCU", "GCC", "GCA", "GCG"].includes(codon)) {
    return "A";
  }
  // Third column
  if (["UAU", "UAC"].includes(codon)) {
    return "Y";
  }
  if (["UAA", "UAG"].includes(codon)) {
    return "*";
  }
  if (["CAU", "CAC"].includes(codon)) {
    return "H";
  }
  if (["CAA", "CAG"].includes(codon)) {
    return "Q";
  }
  if (["AAU", "AAC"].includes(codon)) {
    return "N";
  }
  if (["AAA", "AAG"].includes(codon)) {
    return "K";
  }
  if (["GAU", "GAC"].includes(codon)) {
    return "D";
  }
  if (["GAA", "GAG"].includes(codon)) {
    return "E";
  }
  // Fourth column
  if (["UGU", "UGC"].includes(codon)) {
    return "C";
  }
  if (["UGA"].includes(codon)) {
    return "*";
  }
  if (["UGG"].includes(codon)) {
    return "W";
  }
  if (["CGU", "CGC", "CGA", "CGG"].includes(codon)) {
    return "R";
  }
  if (["AGU", "AGC"].includes(codon)) {
    return "S";
  }
  if (["AGA", "AGG"].includes(codon)) {
    return "R";
  }
  if (["GGU", "GGC", "GGA", "GGG"].includes(codon)) {
    return "G";
  }

  throw Error(`Invalid codon: ${codon}`);
};

const toORFs = (aminoacids: string[]): string[] => {
  // Find all Ms
  var mIndexes = [];
  var i = 0;
  for (i = 0; i < aminoacids.length; i++) {
    if (aminoacids[i] === "M") {
      mIndexes.push(i);
    }
  }

  var orfs: string[] = [];

  i = 0;
  for (i = 0; i < mIndexes.length; i++) {
    const m = mIndexes[i];
    const s = aminoacids.findIndex(
      (aminoacid, index) => index > m && aminoacid === "*"
    );
    if (s !== -1 && s !== m + 1) {
      orfs.push(aminoacids.slice(m, s + 1).join(""));
    }
  }
  return orfs;
};

export const allORFs = (dna: string[]): string[] => {
  const dnas = [
    dna,
    toComplementary(dna),
    dna.slice(1),
    toComplementary(dna).slice(1),
    dna.slice(2),
    toComplementary(dna).slice(2),
  ];

  const convert = (seq: string[]) =>
    toORFs(toCodons(toRNA(seq)).map(toAminoacid));

  const result = dnas.map(convert).flat(1);

  return result;
};

export const acceptableORFs = (orfs: string[]) =>
  orfs.filter((orf) => orf.length > 2).length > 0;
