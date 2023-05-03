import { DocumentBuilder} from '@nestjs/swagger';

export const options = new DocumentBuilder()
.setTitle('API Documentation')
.setDescription('API Documentation')
.setVersion('1.0')
.addTag('api')
.build();