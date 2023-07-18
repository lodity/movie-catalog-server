import { randomUUID } from 'crypto';
import path from 'path';
import fs from 'fs';

class FileService {
	saveFile(file: any, previousFileName: string) {
		try {
			if (
				previousFileName !== 'none' &&
				fs.existsSync(path.resolve('static', previousFileName))
			) {
				fs.unlinkSync(path.resolve('static', previousFileName));
			}
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
