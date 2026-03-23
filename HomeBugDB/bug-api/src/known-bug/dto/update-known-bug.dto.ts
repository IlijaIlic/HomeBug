import { PartialType } from '@nestjs/mapped-types';
import { CreateKnownBugDto } from './create-known-bug.dto';

export class UpdateKnownBugDto extends PartialType(CreateKnownBugDto) {}
