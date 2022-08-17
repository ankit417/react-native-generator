exports.serviceBoilerplate = (fileName) => {
  return `import {api} from '@src/api';
  
type ${fileName}Response = {
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

// MARK: - get${fileName}
const get${fileName} = async ({
  id
}: {
  id: number;
}): Promise<${fileName}Reponse> => {
  const response = await api.get<${fileName}Response>(
    '/api/',
  );
  
  return response.data;
  };
  
const ${fileName}Service={
    get${fileName}
  }

export {${fileName}Service};
export type {${fileName}Response};
  `;
};
