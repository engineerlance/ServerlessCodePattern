import * as faker from "faker";

export const propsMocker = (overrides?) => {
  const mockProps = {
    MovTitle: faker.name.findName(),
    MovYear: faker.datatype.number({ min: 1900, max: 2030 }),
    MovLang: "en",
    MovCountry: "USA",
    MovGenre: ["Action", "Thriller"],
    MovDirector: "Quentin Tarantino",
    MovProdCompanies: [{ country: "USA", name: "Universal" }],
  };
  return {
    ...mockProps,
    ...overrides,
  };
};
