const capitalize = require("../utils/capitalize");

exports.serviceBoilerplate = (fileName) => {
  const name = capitalize(fileName);
  return `import {api} from '@src/api';
  
type ${name}Response = {
  success: boolean;
  data: {
    type: string;
    message: string;
    data: {
      id: number;
      created_at: string;
      updated_at: string;
    };
  };
 };

// MARK: - get${name}
const get${name} = async ({
  id
}: {
  id: number;
}): Promise<${name}Reponse> => {
  const response = await api.get<${name}Response>(
    '/api/',
  );
  
  return response.data;
  };
  
const ${fileName}Service={
    get${name}
  }

export {${fileName}Service};
export type {${name}Response};
  `;
};
