import { PartialType } from '@nestjs/mapped-types';
import { CreateUnknownBugDto } from './create-unknown-bug.dto';

export class UpdateUnknownBugDto extends PartialType(CreateUnknownBugDto) {}
