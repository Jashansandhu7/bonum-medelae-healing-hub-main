import { getProductImage } from "../assets/productImages";

export interface Product {
  id: string;
  name: string;
  composition: string;
  packSize: string;
  packing: string;
  mrpPerUnit: number;
  gst: string;
  category: string;
  image: string;
}

export const products: Product[] = [
  // Tablets and Capsules - Only products with available images
  {
    id: "abf-100",
    name: "ABF 100 Tablet",
    composition: "Thiamine HCl 100 mg Tablet",
    packSize: "20X10",
    packing: "BLISTER",
    mrpPerUnit: 999.00,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: getProductImage("abf-100")
  },
  {
    id: "abf-plus-injection",
    name: "ABF PLUS Injection",
    composition: "Methyl-1500mcg+Thiamine-100 mg +Pyridoxine-100mg + Niacinamide-100mg+ D-Panthenol 50mg",
    packSize: "1x5x10",
    packing: "AMP",
    mrpPerUnit: 70.00,
    gst: "12%",
    category: "INJECTIONS",
    image: getProductImage("abf-plus-injection")
  },
  {
    id: "alba-worm",
    name: "Alba worm",
    composition: "Albanadazole 400 mg + Ivermectin 6 mg",
    packSize: "1x1",
    packing: "BLISTER",
    mrpPerUnit: 25.00,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: getProductImage("alba-worm")
  },
  {
    id: "apenosa-spas",
    name: "Apenosa-Spas Tablet",
    composition: "Aceclo100 mg. & Drotaverine 80 mg.",
    packSize: "10x10",
    packing: "ALU ALU",
    mrpPerUnit: 1200.00,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: getProductImage("apenosa-spas")
  },
  {
    id: "apenosa-sp-15",
    name: "Apenosa-SP Tablet 15",
    composition: "Aceclofenac 100mg, Paracetamol 325mg, Serratiopeptidase 15mg",
    packSize: "10x10",
    packing: "ALU ALU",
    mrpPerUnit: 1350.00,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: getProductImage("apenosa-sp-15")
  },
  {
    id: "apenosa-sp",
    name: "Apenosa-SP Tablet",
    composition: "Aceclofenac 100mg, Paracetamol 325mg, Serratiopeptidase 10mg",
    packSize: "10x10",
    packing: "ALU ALU",
    mrpPerUnit: 1150.00,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: getProductImage("apenosa-sp")
  },
  {
    id: "apenosa-p",
    name: "Apenosa-P Tablet",
    composition: "Aceclofenac 100 mg. & Paracetamol 325 mg.",
    packSize: "10x10",
    packing: "BLISTER",
    mrpPerUnit: 750.00,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: getProductImage("apenosa-p")
  },
  {
    id: "apenosa-mr",
    name: "Apenosa-MR Tablet",
    composition: "Aceclo100 mg. & PCM 325 mg. & Chlorzoxazone 250 mg.",
    packSize: "10x10",
    packing: "ALU ALU",
    mrpPerUnit: 1100.00,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: getProductImage("apenosa-mr")
  },
  {
    id: "apenosa-dsp",
    name: "Apenosa DSP",
    composition: "Diclofenec 50 mg, Para 325 mg and Serratiopeptidase 15 mg",
    packSize: "10x10",
    packing: "ALU ALU",
    mrpPerUnit: 990.00,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: getProductImage("apenosa-dsp")
  },
  {
    id: "b-trac-200",
    name: "B TRAC 200",
    composition: "Itraconazole 200 mg",
    packSize: "10X10",
    packing: "BLISTER",
    mrpPerUnit: 2477.40,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: getProductImage("b-trac-200")
  },
  {
    id: "bconazole-400",
    name: "Bconazole-400TABLET",
    composition: "Fluconazole 400mg",
    packSize: "1X20",
    packing: "BLISTER",
    mrpPerUnit: 666.40,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: getProductImage("bconazole-400")
  },
  {
    id: "besfirox-500",
    name: "BESFUROX-500 TABLET",
    composition: "CEFUROXIME 500MG WITH MONO CARTOON",
    packSize: "10X10",
    packing: "ALU ALU",
    mrpPerUnit: 5750.00,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: getProductImage("besfirox-500")
  },
  {
    id: "besithro-250",
    name: "Besithro 250 Tablet",
    composition: "Azithromycin 250 mg.",
    packSize: "10 X 6",
    packing: "BLISTER",
    mrpPerUnit: 780.00,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: getProductImage("besithro-250")
  },
  {
    id: "besithro-500",
    name: "Besithro 500 tablet",
    composition: "Azithromycin 500 mg. FC Tablet",
    packSize: "10x3",
    packing: "BLISTER",
    mrpPerUnit: 790.00,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: getProductImage("besithro-500")
  },
  {
    id: "besixime-o",
    name: "Besixime O Tablet",
    composition: "Cefixime 200 mg. & Ofloxacin 200 mg.",
    packSize: "10x10",
    packing: "ALU ALU",
    mrpPerUnit: 2500.00,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: getProductImage("besixime-o")
  },
  {
    id: "besixime-oz",
    name: "Besixime OZ Tablet",
    composition: "Cefixime 200 mg. & Ornidazole 500 mg.",
    packSize: "10x10",
    packing: "ALU ALU",
    mrpPerUnit: 2250.00,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: getProductImage("besixime-oz")
  },
  {
    id: "besixime-100dt",
    name: "Besixime 100 DT Tablet",
    composition: "Cefixime 100 mg.",
    packSize: "10x10",
    packing: "ALU ALU",
    mrpPerUnit: 1050.00,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: getProductImage("besixime-100dt")
  },
  {
    id: "besixime-200",
    name: "Besixime 200 FC Tablet",
    composition: "Cefixime 200 mg.",
    packSize: "10x10",
    packing: "ALU ALU",
    mrpPerUnit: 1095.30,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: getProductImage("besixime-200")
  },
  {
    id: "belslzine-m",
    name: "Beslzine M Tablet",
    composition: "Levcetrizine 5 mg & Montelukast 10 mg",
    packSize: "10x10",
    packing: "ALU ALU",
    mrpPerUnit: 1250.00,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: getProductImage("belslzine-m")
  },
  {
    id: "bespodox-200",
    name: "BESPODOX 200 TAB",
    composition: "Cefpodoxime 200 mg",
    packSize: "1*10",
    packing: "ALU ALU",
    mrpPerUnit: 2500.00,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: getProductImage("bespodox-200")
  },
  {
    id: "bomcold",
    name: "Bomcold Tablet",
    composition: "PCM 500 mg., CPM 2 mg., Phenylepherine HCl 5 mg, Diphenhydramine HCl 25 mg & Caffeine 30mg.",
    packSize: "10x10",
    packing: "BLISTER",
    mrpPerUnit: 980.00,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: getProductImage("bomcold")
  },
  {
    id: "bonumflox-oz-tablets",
    name: "Bonumoflox OZ tablet",
    composition: "Ofloxacin 200 mg. & Ornidazole 500 mg.",
    packSize: "10x10",
    packing: "BLISTER",
    mrpPerUnit: 1250.00,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: getProductImage("bonumflox-oz-tablets")
  },

  {
    id: "bonumrab-dsr",
    name: "Bonumrab - DSR",
    composition: "Enteric Coated Rabeprazole 20 mg. & Domperidone IR10 mg + SR 20 mg.",
    packSize: "10x10",
    packing: "ALU ALU",
    mrpPerUnit: 1050.00,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: getProductImage("bonumrab-dsr")
  },
  {
    id: "bonumrab-sl",
    name: "Bonumrab - SL",
    composition: "Rabeprazole 20 mg. & Levosulpride 75 mg. SR",
    packSize: "10x10",
    packing: "ALU ALU",
    mrpPerUnit: 2000.00,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: getProductImage("bonumrab-sl")
  },
  {
    id: "halt-vom",
    name: "Halt Vom Tablet",
    composition: "Ondansetron-4mg (mouth Dissolving) Tab",
    packSize: "10x10",
    packing: "ALU ALU",
    mrpPerUnit: 550.00,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: getProductImage("halt-vom")
  },
  {
    id: "mef-b-spas",
    name: "Mef-B Spas Tablet",
    composition: "Mefenamic Acid-250mg. Dicyclomine _20mg",
    packSize: "10x10",
    packing: "BLISTER",
    mrpPerUnit: 700.00,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: getProductImage("mef-b-spas")
  },
  {
    id: "myca-p-75",
    name: "MYCA-P 75",
    composition: "Pregabalin 75 and Methylcobalamin 750mcg",
    packSize: "10 X10",
    packing: "ALU ALU",
    mrpPerUnit: 1100.00,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: getProductImage("myca-p-75")
  },
  {
    id: "oreja",
    name: "Oreja EAR Drop",
    composition: "Gentamicin, Clotrimazole, Lignocaine & Becomethasone Ear Drop",
    packSize: "5 ML",
    packing: "DROP",
    mrpPerUnit: 60.00,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: getProductImage("oreja")
  },
  {
    id: "p-namo",
    name: "P-NAMO",
    composition: "Nimesulide 100mg + Paracetamol 325mg",
    packSize: "10x10",
    packing: "BLISTER",
    mrpPerUnit: 700.00,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: getProductImage("p-namo")
  },
  {
    id: "synoxyclav-625",
    name: "Synoxyclav 625",
    composition: "Amoxycillin Trihydrate 500mg + Potassium Clavulnate-125MG",
    packSize: "10 X6",
    packing: "ALU ALU",
    mrpPerUnit: 1229.70,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: getProductImage("synoxyclav-625")
  },
  {
    id: "gacitor",
    name: "Gacitor Tablet",
    composition: "Pantoprazole sodium Sesquihydrate 40 mg. EC tablet",
    packSize: "10x10",
    packing: "ALU ALU",
    mrpPerUnit: 850.00,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: getProductImage("gacitor")
  },

  {
    id: "gacitor-dsr",
    name: "Gacitor DSR Capsule",
    composition: "Enteric Coated Pantoprazole 40 mg. & Domperidone IR10mg + SR 20 mg",
    packSize: "10x10",
    packing: "ALU ALU",
    mrpPerUnit: 1500.00,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: getProductImage("gacitor-dsr")
  },
  {
    id: "bestriaxon-s",
    name: "Bestriaxon S Injection",
    composition: "Ceftriaxone 1 gm. & Sulbactam 500 mg. Vial",
    packSize: "Unit Pack",
    packing: "BOTTEL",
    mrpPerUnit: 175.00,
    gst: "12%",
    category: "INJECTIONS",
    image: getProductImage("bestriaxon-s")
  },
  {
    id: "bestriaxon-inj",
    name: "Bestriaxon Injection",
    composition: "Ceftriaxone 1 gm. Vial (Tubular Vial)",
    packSize: "Unit Pack",
    packing: "BOTTEL",
    mrpPerUnit: 71.00,
    gst: "12%",
    category: "INJECTIONS",
    image: getProductImage("bestriaxon-inj")
  },
  {
    id: "abf-injection",
    name: "ABF Injection",
    composition: "Each ml contains Thiamine HCl 50 mg. Each amp. 100 mg. (2 ml)",
    packSize: "1x5x10",
    packing: "AMP",
    mrpPerUnit: 60.00,
    gst: "12%",
    category: "INJECTIONS",
    image: getProductImage("abf-injection")
  },
  {
    id: "apenosa-d-inj",
    name: "Apenosa-D Inj.",
    composition: "Diclofenac 75 mg. in each 1 ml ampoule (Aquous base).",
    packSize: "1x5x10",
    packing: "blister",
    mrpPerUnit: 16.50,
    gst: "12%",
    category: "INJECTIONS",
    image: getProductImage("apenosa-d-inj")
  },
  // Prebiotic and Probiotic
  {
    id: "probinorm",
    name: "Probinorm capsule",
    composition: "Each cap cntains: Lactobacillus Acidophillus, Lactobacillus Rhamnosus, Bifidobacterium Longum, Sacharomyces Boulardii. (Not Less Then 2.5 Billion Cells)",
    packSize: "10x10",
    packing: "ALU ALU",
    mrpPerUnit: 1500.00,
    gst: "18%",
    category: "PREBIOTIC AND PROBIOTIC",
    image: getProductImage("probinorm")
  },
  // Syrups
  {
    id: "bonumflox-oz-susp",
    name: "Bonumflox OZ Susp",
    composition: "Each 5ml contain Ofloxacin 50 mg, Ornidazole 125 mg, Simethicone 10mg",
    packSize: "60ml",
    packing: "bottle",
    mrpPerUnit: 90.00,
    gst: "12%",
    category: "SYRUPS",
    image: getProductImage("bonumflox-oz")
  },
  {
    id: "livzor-200",
    name: "Livzor-200 syrup",
    composition: "silymarin-140 mg, L-Ornithine L-Aspartate-250 mg, Thiamine HCL-1.5 mg, Riboflavin-1.5 mg, Pyridoxine Hcl-1.5 mg, Niacinamide- 20 mg, D-Panthenol- 5 mg, Cyanocobalamin- 1 Mcg, Folic Acid- 0.5 mg, Zinc- 7.5 mg",
    packSize: "200 ml",
    packing: "Bottle",
    mrpPerUnit: 170.00,
    gst: "18%",
    category: "SYRUPS",
    image: getProductImage("livzor-200")
  },
  {
    id: "quelcold",
    name: "Quelcold Syrup 100ml",
    composition: "Each 5 ml contains Dextromethorphan 10 mg.; Phenylephrine 5 mg.; CPM 2 mg.",
    packSize: "100 ml.",
    packing: "Bottle",
    mrpPerUnit: 95.00,
    gst: "12%",
    category: "SYRUPS",
    image: getProductImage("quelcold")
  },
  {
    id: "quelcold-ex",
    name: "Quelcold EX Syrup 100ml",
    composition: "Each 5ml contain Ambroxol HCL-15MG, Terbultaline sulphate-1.5 mg, Guaiohenesin 50mg",
    packSize: "100ml",
    packing: "Bottle",
    mrpPerUnit: 90.00,
    gst: "12%",
    category: "SYRUPS",
    image: getProductImage("quelcold-ex")
  },
  {
    id: "quelkof-ls",
    name: "Quelkof-LS SYP 100ML",
    composition: "Each 5ml contain Levosalbutamol-1MG, Ambroxol-30 MG and Guaiphenesin-50MG",
    packSize: "100ml",
    packing: "Bottle",
    mrpPerUnit: 110.00,
    gst: "12%",
    category: "SYRUPS",
    image: getProductImage("quelkof-ls")
  },
  {
    id: "quelkof-dx",
    name: "Quelkof-Dx SF Syp 100ML",
    composition: "Each 5 ml contains Dextromethorphan 10 mg.; chloropheniramine 2mg",
    packSize: "100 ml.",
    packing: "Botttle",
    mrpPerUnit: 95.00,
    gst: "12%",
    category: "SYRUPS",
    image: getProductImage("quelkof-dx")
  },
  {
    id: "synoxyclav-lb-625",
    name: "Synoxyclav KID 228.5MG DRY SYP",
    composition: "Amoxycillin Trihydrate 200mg + Potassium Clavulnate28.5 MG",
    packSize: "30ML",
    packing: "BOTTLE",
    mrpPerUnit: 69.21,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: getProductImage("synoxyclav-lb-625")
  },
  // Iron and Calcium Range
  {
    id: "calcio-60k",
    name: "CALCIO-60K NANO SHOT",
    composition: "Cholecalciferol 60000 IU",
    packSize: "4X1",
    packing: "BOTTLE",
    mrpPerUnit: 380.00,
    gst: "12%",
    category: "IRON AND CALCIUM RANGE",
    image: getProductImage("calcio-60k")
  },
  {
    id: "calcio-max",
    name: "Calcio-Max",
    composition: "EPA-180mg,DHA- 120mg, Methylocabalamin 1500mcg, Folic Acid 400mcg, Boron 1.5mg, Calcium Corbonate 500mg Softgel Capsules",
    packSize: "10x10",
    packing: "Blister",
    mrpPerUnit: 2400.00,
    gst: "18%",
    category: "IRON AND CALCIUM RANGE",
    image: getProductImage("calcio-max")
  },
  {
    id: "calcio-d3",
    name: "Calcio-D3 Tab",
    composition: "Calcium citrate-1000mg; Vit D3-200 IU, Magnesium 100mg, Zinc 4mg",
    packSize: "10x10",
    packing: "Blister",
    mrpPerUnit: 800.00,
    gst: "12%",
    category: "IRON AND CALCIUM RANGE",
    image: getProductImage("calcio-d3")
  },
  {
    id: "feroboom-xt-tablets",
    name: "Feroboom-XT Tab",
    composition: "Ferrous Ascorbate-100mg; Folic Acid-1.5mg;Zinc-22.5Mg;",
    packSize: "10x10",
    packing: "Alu Alu",
    mrpPerUnit: 1500.00,
    gst: "12%",
    category: "IRON AND CALCIUM RANGE",
    image: getProductImage("feroboom-xt-tablets")
  },
  {
    id: "feroboom-xt-bootle",
    name: "Feroboom XT Suspension",
    composition: "Each 5 ml Ferrous Ascorbate 100mg, Folic Acid 1.5mg, Zinc 22.5mg, Thiamin 15mg, Pyridoxine 3mg, Adeosylcobalamin 750mg",
    packSize: "200ML",
    packing: "Bottle",
    mrpPerUnit: 150.00,
    gst: "18%",
    category: "IRON AND CALCIUM RANGE",
    image: getProductImage("feroboom-xt-bootle")
  },

  // Multivitamins
  {
    id: "bm-pro",
    name: "BM PRO PROTEIN POWDER KESAR/ELIACHI FLAVOUR",
    composition: "BM PRO PROTEIN POWDER KESAR/ELIACHI FLAVOUR",
    packSize: "Unit Pack",
    packing: "JAR",
    mrpPerUnit: 250.00,
    gst: "18%",
    category: "MULTIVITAMINS",
    image: getProductImage("bm-pro")
  },
  {
    id: "bm-11g",
    name: "BM-11G SOFTGEL CAP",
    composition: "GREEN TEA EXTRACT, GINSENG, GRAPE SEED EXTRACT, GINKGO BILOBA WITH OMEGA-3 FATTY ACID, MULTIVITAMIN & MULTIMINERAL SOFTGEL CAPSULE",
    packSize: "10X10",
    packing: "BLISTER",
    mrpPerUnit: 3100.00,
    gst: "18%",
    category: "MULTIVITAMINS",
    image: getProductImage("bm-11g")
  },
  {
    id: "bm-immune",
    name: "BM-PLAT TAB",
    composition: "TINOSORA CARDIFOLIA (गिलोय) 500MG + CARICA PAPAYA(पपीता) 500MG + COLOSTRUM (खीस) 50MG+ OCIMUM SANCTUM (तुलसी) 200MG + GOAT MILK (बकरी के दूध) 100MG",
    packSize: "10X10",
    packing: "ALU ALU",
    mrpPerUnit: 2800.00,
    gst: "18%",
    category: "MULTIVITAMINS",
    image: getProductImage("bm-immune")
  },
  {
    id: "bonum-vit",
    name: "Bonumvit Capsule",
    composition: "Antioxidants, Multivitamin, Multimineral, Lycopene and Methylcobalamin Capsules",
    packSize: "10 x10",
    packing: "Alu Alu",
    mrpPerUnit: 1400.00,
    gst: "18%",
    category: "MULTIVITAMINS",
    image: "/api/placeholder/300/200"
  },
  {
    id: "myca-ala",
    name: "MYCA-ALA CAP",
    composition: "METHYLCOBALAMIN-1500 MCG, ALPHA LIPOIC ACID-100MCG, CHROMIUM PICOLINATE-200 MCG, CALCIUM PANTOTHENATE - 5 MG, NIACINAMIDE-18 MG, VIT B6-3MG, PYRIDOXINE HCL-3 MG, FOLIC ACID-1.5 MG",
    packSize: "10X10",
    packing: "ALU ALU",
    mrpPerUnit: 1450.00,
    gst: "18%",
    category: "MULTIVITAMINS",
    image: getProductImage("myca-ala")
  },
  // Gel
  {
    id: "apenosa-d-gel",
    name: "Apenosa-D Gel",
    composition: "Diclofenac diethyamine 1.16% w/w, Linseed oil 3% w/w, Methyl Salicylate 10% w/w & Menthol 5% w/w.",
    packSize: "30 gm.",
    packing: "Tube",
    mrpPerUnit: 105.00,
    gst: "12%",
    category: "GEL",
    image: getProductImage("apenosa-d-gel")
  },
  {
    id: "medoderm",
    name: "Medoderm",
    composition: "Neomycin Sulphate, Miconazle nitrate and Clobetasole Propionate cream",
    packSize: "15gm",
    packing: "Tube",
    mrpPerUnit: 82.00,
    gst: "12%",
    category: "GEL",
    image: getProductImage("medoderm")
  },
  // Ayurvedic
  {
    id: "apenosa-oil",
    name: "Apenosa - Oil",
    composition: "Herbal pain relieving oil",
    packSize: "50 ml",
    packing: "Bottle",
    mrpPerUnit: 110.00,
    gst: "12%",
    category: "AYURVEDIC",
    image: getProductImage("apenosa-oil")
  },
  {
    id: "bon-2-tone",
    name: "BON 2 TONE",
    composition: "UTERINE TONIC Syrup",
    packSize: "200 ml",
    packing: "Bottle",
    mrpPerUnit: 125.00,
    gst: "12%",
    category: "AYURVEDIC",
    image: getProductImage("bon-2-tone")
  },
  {
    id: "bonculi-syp",
    name: "Bonculi SYP",
    composition: "FOR IMPROVE SOLUBILITY,CRACK,REMOVAL OF STONE",
    packSize: "200 ml",
    packing: "Bottle",
    mrpPerUnit: 175.00,
    gst: "12%",
    category: "AYURVEDIC",
    image: getProductImage("bonculi-syp")
  },
  {
    id: "bonum-liv",
    name: "Bonum liv",
    composition: "LIVER TONIC Syrup",
    packSize: "200 ml",
    packing: "Bottle",
    mrpPerUnit: 120.00,
    gst: "12%",
    category: "AYURVEDIC",
    image: getProductImage("bonum-liv")
  },
  {
    id: "bonumzyme",
    name: "Bonumzyme",
    composition: "Enzymes syrup",
    packSize: "200 ml",
    packing: "Bottle",
    mrpPerUnit: 120.00,
    gst: "12%",
    category: "AYURVEDIC",
    image: getProductImage("bonumzyme")
  },
  {
    id: "b-pure",
    name: "B-PURE SYP",
    composition: "Blood Purifier",
    packSize: "200 ML",
    packing: "BOTTLE",
    mrpPerUnit: 115.00,
    gst: "12%",
    category: "AYURVEDIC",
    image: getProductImage("b-pure")
  },
  {
    id: "liv-zim-syrup",
    name: "Liv-Zim syp",
    composition: "Herbal LIVER & Enzyme TONIC Syrup",
    packSize: "200 ml",
    packing: "Bottle",
    mrpPerUnit: 150.00,
    gst: "12%",
    category: "AYURVEDIC",
    image: getProductImage("liv-zim-syrup")
  },
  {
    id: "ovume",
    name: "OVUME CAP",
    composition: "HERBAL CAP ENCHANCE STAMINA & VOGOR",
    packSize: "30 CAP",
    packing: "Bottle",
    mrpPerUnit: 900.00,
    gst: "12%",
    category: "AYURVEDIC",
    image: getProductImage("ovume")
  },
  {
    id: "tusse-cura",
    name: "Tusse Cura",
    composition: "Herbal Cough Syp",
    packSize: "100ML",
    packing: "Bottle",
    mrpPerUnit: 99.00,
    gst: "12%",
    category: "AYURVEDIC",
    image: getProductImage("tusse-cura")
  },
  {
    id: "witt-plus",
    name: "WITT-PLUS SYP",
    composition: "BRAIN TONIC",
    packSize: "200 ML",
    packing: "Bottle",
    mrpPerUnit: 120.00,
    gst: "12%",
    category: "AYURVEDIC",
    image: getProductImage("witt-plus")
  },
  // Special Combinations
  {
    id: "vasalus",
    name: "Vasalas Softgel Capsule",
    composition: "Grape Seed Extract 100 mg., Flax seed oil 500 mg., Ginkogo biloba 60 mg., Folic acid 1.5 mg., Vitamin B6 1 mg., Methylcobalamin 150 mcg., Vit. D3 200 IU (Blister Pack)",
    packSize: "10x10",
    packing: "Blister",
    mrpPerUnit: 1700.00,
    gst: "18%",
    category: "SPECIAL COMBINATIONS",
    image: getProductImage("vasalus")
  },
  // Additional products with default images

  {
    id: "apenosa-dp",
    name: "Apenosa DP",
    composition: "Diclofenec 50 mg and Paracetamol 325 mg",
    packSize: "10x10",
    packing: "BLISTER",
    mrpPerUnit: 550.00,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: "/api/placeholder/300/200"
  },
  {
    id: "beslzine",
    name: "Beslzine Tablet",
    composition: "Levocetrizine 5 mg.",
    packSize: "10x10",
    packing: "ALU ALU",
    mrpPerUnit: 500.00,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: "/api/placeholder/300/200"
  },
  {
    id: "bzcort",
    name: "BZCORT TABLET",
    composition: "DEFLAZACORT-6 MG",
    packSize: "10X10",
    packing: "ALU ALU",
    mrpPerUnit: 1200.00,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: "/api/placeholder/300/200"
  },
  {
    id: "esnum-d",
    name: "ESNUM-D CAP",
    composition: "Enteric Coated ESOMEPRAZOLE 40 mg. & Domperidone SR 30 mg",
    packSize: "10X10",
    packing: "ALU ALU",
    mrpPerUnit: 1200.00,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: "/api/placeholder/300/200"
  },
  {
    id: "fexozine-m",
    name: "FEXOZINE-M TAB",
    composition: "FEXOFENADINE HYDROCHLORIDE 120MG+ MONTELUKAST 10MG TAB",
    packSize: "10X10",
    packing: "ALU ALU",
    mrpPerUnit: 1550.00,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: "/api/placeholder/300/200"
  },
  {
    id: "gacitor-injection",
    name: "Gacitor Injection",
    composition: "Sterile Pantoprazole sodium 40 mg. Vial (Tubular vial)",
    packSize: "Unit Pack",
    packing: "BOTTEL",
    mrpPerUnit: 56.50,
    gst: "12%",
    category: "INJECTIONS",
    image: "/api/placeholder/300/200"
  },

  {
    id: "bomcold-syrup",
    name: "Bomcold Syrup",
    composition: "Each 5 ml. contains Paracetamol 125 mg., Phenylephrine 5 mg. ,Chlorpheniamine maleate 0.5 mg sodium citrate 60 mg, menthol 1 mg",
    packSize: "60 ml.",
    packing: "bottle",
    mrpPerUnit: 60.00,
    gst: "12%",
    category: "SYRUPS",
    image: "/api/placeholder/300/200"
  },
  {
    id: "bm-cyp-syrup",
    name: "BM-CYP SYRUP",
    composition: "Cyproheptadine HCL-2MG, Tricholine Citrate(65%w/w)-275mg, Sorbitol",
    packSize: "200 ML",
    packing: "Bottle",
    mrpPerUnit: 150.00,
    gst: "12%",
    category: "SYRUPS",
    image: "/api/placeholder/300/200"
  },


  {
    id: "omegnum-e",
    name: "Omegnum-E Softgel Cap",
    composition: "Omega-3 Fatty Acid 1000 mg(EPA-460 mg& DHA-380 mg)",
    packSize: "10X10",
    packing: "BLISTER",
    mrpPerUnit: 1500.00,
    gst: "18%",
    category: "MULTIVITAMINS",
    image: "/api/placeholder/300/200"
  },

  {
    id: "shilagandha",
    name: "SHILAGANDHA CAP",
    composition: "HERBAL CAP ENCHANCE STAMINA & VOGOR",
    packSize: "30 CAP",
    packing: "BOTTLE",
    mrpPerUnit: 900.00,
    gst: "12%",
    category: "AYURVEDIC",
    image: "/api/placeholder/300/200"
  },


  {
    id: "ashvagandha-powder",
    name: "ASHVAGANDHA POWDER",
    composition: "WITHANIA SOMNIFERA -100 GM",
    packSize: "100 GM",
    packing: "JAR",
    mrpPerUnit: 270.00,
    gst: "2.5%",
    category: "AYURVEDIC",
    image: "/api/placeholder/300/200"
  },

  {
    id: "trifla-powder",
    name: "TRIFLA POWDER",
    composition: "TERMINALIA CHEBULA- 14.29 GM, TERMINALLA BELERICA -28.57 GM, EMBLICA OFFICINALE -57.15 GM",
    packSize: "120GM",
    packing: "JAR",
    mrpPerUnit: 120.00,
    gst: "2.5%",
    category: "AYURVEDIC",
    image: "/api/placeholder/300/200"
  },


  {
    id: "curcumed-cap",
    name: "CURCUMED CAP",
    composition: "CURCUMA LONGA-600MG, BOSWELLIA SERRATA-250MG, PIPER NIGRUM-5MG, YASHAD BHASMA-5MG",
    packSize: "30CAP",
    packing: "JAR",
    mrpPerUnit: 900.00,
    gst: "12.0%",
    category: "AYURVEDIC",
    image: "/api/placeholder/300/200"
  },
  {
    id: "vrahat-sitopladi-powder",
    name: "VRAHAT SITOPLADI POWDER",
    composition: "VRAHAT SITOPLADI-100 GM",
    packSize: "100GM",
    packing: "JAR",
    mrpPerUnit: 225.00,
    gst: "2.5%",
    category: "AYURVEDIC",
    image: "/api/placeholder/300/200"
  },
  {
    id: "avipatikar-powder",
    name: "AVIPATIKAR POWDER",
    composition: "AVIPATIKAR-100GM",
    packSize: "100GM",
    packing: "JAR",
    mrpPerUnit: 195.00,
    gst: "2.5%",
    category: "AYURVEDIC",
    image: "/api/placeholder/300/200"
  },
  {
    id: "safed-musli-powder",
    name: "SAFED MUSLI POWDER",
    composition: "CHLOROPHYTUM BORIVILIANUM 100GM",
    packSize: "100 GM",
    packing: "JAR",
    mrpPerUnit: 250.00,
    gst: "2.5%",
    category: "AYURVEDIC",
    image: "/api/placeholder/300/200"
  },
  {
    id: "Bonumflox tablet",
    name: "BONUMFLOX TABLET",
    composition: "Ofloxacin 200 mg",
    packSize: "10X10",
    packing: "ALU ALU",
    mrpPerUnit: 850.00,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: "/api/placeholder/300/200"
  },
  {
    id: "BM-HIST 16 TABLET",
    name: "BM-HIST 16 TABLET",
    composition: "Betahistine-16MG",
    packSize: "10X10",
    packing: "ALU ALU",
    mrpPerUnit: 2000.00,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: "/api/placeholder/300/200"
  },
  {
    id: "BUDLIV-300 TABLET",
    name: "BUDLIV-300 TABLET",
    composition: "Ursodeoxycholic Acid 300 mg",
    packSize: "10X10",
    packing: "ALU ALU",
    mrpPerUnit: 3990.00,
    gst: "12%",
    category: "TABLETS AND CAPSULES",
    image: "/api/placeholder/300/200"
  },
  {
    id: "CACIO-60K SOFTGEL CAPSULE",
    name: "CACIO-60K SOFTGEL CAPSULE",
    composition: "Cholecalciferol 60000 IU",
    packSize: "10X4",
    packing: "ALU ALU",
    mrpPerUnit: 1100.00,
    gst: "12%",
    category: "IRON AND CALCIUM RANGE",
    image: "/api/placeholder/300/200"
  },
  {
    id: "BONUMVIT SYRUP",
    name: "BONUMVIT SYRUP",
    composition: "Antioxidant, Multivitamin, Multimineral, Lycopene and Methylcobalamin",
    packSize: "200ML",
    packing: "Bottle",
    mrpPerUnit: 159.00,
    gst: "18%",
    category: "MULTIVITAMINS",
    image: getProductImage("bonum-vit")
  },
  {
    id: "Bonum Liv-DS syrup",
    name: "Bonum Liv-DS syrup",
    composition: "Double Strength Liver Tonic for Hepatoprevention, Hepatogeneration and Hepatocorrection",
    packSize: "200 ML",
    packing: "Bottle",
    mrpPerUnit: 145.00,
    gst: "12%",
    category: "AYURVEDIC",
    image: "/api/placeholder/300/200"
  },
  {
    id: "Bonumzyme-DS syrup",
    name: "Bonum Liv-DS syrup",
    composition: "Double Strength Digestive Tonic for Indigestion, Bloat Gas, Acidity, Low Enzyme Secretions",
    packSize: "200 ML",
    packing: "Bottle",
    mrpPerUnit: 142.00,
    gst: "12%",
    category: "AYURVEDIC",
    image: "/api/placeholder/300/200"
  },
  {
    id: "MULETHI POWDER",
    name: "MULETHI POWDER",
    composition: "GLYCYRRHIZA GLABRA-100 GM",
    packSize: "100 GM",
    packing: "JAR",
    mrpPerUnit: 130.00,
    gst: "2.5%",
    category: "AYURVEDIC",
    image: "/api/placeholder/300/200"
  },
  {
    id: "HARITAKI POWDER",
    name: "HARITAKI POWDER",
    composition: "TERMINALIA CHEBULA -100 GM",
    packSize: "100 GM",
    packing: "JAR",
    mrpPerUnit: 100.00,
    gst: "2.5%",
    category: "AYURVEDIC",
    image: "/api/placeholder/300/200"
  },
  {
    id: "KAUNCH POWDER",
    name: "KAUNCH POWDER",
    composition: "MUCUNA PRURITA-100 GM",
    packSize: "60 GM",
    packing: "JAR",
    mrpPerUnit: 200.00,
    gst: "2.5%",
    category: "AYURVEDIC",
    image: "/api/placeholder/300/200"
  },
  {
    id: "apenosa-oil with roller",
    name: "Apenosa - Oil with Roller",
    composition: "Herbal pain relieving oil",
    packSize: "50 ml ",
    packing: "Bottle",
    mrpPerUnit: 135.00,
    gst: "12%",
    category: "AYURVEDIC",
    image: getProductImage("apenosa-oil")
  }
];

export const categories = [
  "All Products",
  "TABLETS AND CAPSULES",
  "PREBIOTIC AND PROBIOTIC",
  "SYRUPS",
  "IRON AND CALCIUM RANGE",
  "MULTIVITAMINS",
  "INJECTIONS",
  "GEL",
  "AYURVEDIC",
  "SPECIAL COMBINATIONS"
];