import { randomUUID } from 'crypto';
import path from 'path';

class FileService {
	saveFile(file: any) {
		try {
			const fileName = `${randomUUID()}_${file.name}`;
			const filePath = path.resolve('static', fileName);
			file.mv(filePath);
			return fileName;
		} catch (e) {
			console.log(e);
		}
	}
}
export default new FileService();
