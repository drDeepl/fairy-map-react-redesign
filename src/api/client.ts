import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';
import type { Document } from 'openapi-client-axios';
import { OpenAPIClientAxios } from 'openapi-client-axios';
import { create } from '@postinumero/use-async';
import definition from './../../docs/api.swagger.v2.json';

export declare namespace Components {
    namespace Schemas {
        export interface AddAudioStoryDto {
            /**
             *
             */
            userAudioId: number;
            /**
             *
             */
            userId: number;
            /**
             * оценка от проверяющего
             */
            moderateScore: number;
        }
        export interface AddAudioStoryRequestDto {
            /**
             *
             */
            typeId: number;
            /**
             *
             */
            userAudioId: number;
            /**
             * ид пользователя, создавшего заявку
             */
            userId: number;
            /**
             *
             */
            storyId: number;
        }
        export interface AddConstituentDto {
            /**
             *
             */
            name: string;
        }
        export interface AddEthnicGroupDto {
            /**
             *
             */
            name: string;
            /**
             *
             */
            languageId: number;
        }
        export interface AddEthnicGroupMapDto {
            /**
             * географическая долгота
             */
            longitude: number;
            /**
             * географическая широта
             */
            latitude: number;
        }
        export interface AddEthnicGroupToConstituentDto {
            /**
             *
             */
            constituentRfId: number;
            /**
             *
             */
            ethnicGroupId: number;
        }
        export interface AddLanguageDto {
            /**
             *
             */
            name: string;
        }
        export interface AddRatingAudioStoryDto {
            /**
             * номер озвучки из таблицы опубликованных озвучек
             */
            rating: number;
            /**
             * номер озвучки
             */
            audioId: number;
        }
        export interface AddStoryDto {
            /**
             * название истории
             */
            name: string;
            /**
             * id этнической группы
             */
            ethnicGroupId: number;
            /**
             * текст сказки
             */
            text: string;
        }
        export interface AddStoryRequestDto {
            /**
             * название истории
             */
            storyName: string;
            /**
             * порядковый номер заявки
             */
            id: number;
            /**
             * статус заявки
             */
            status: "SEND" | "SUCCESSED" | "CANCELLED";
            /**
             * комментарий от проверяющего
             */
            comment: string;
        }
        export interface AddStoryRequestEntity {
            /**
             *
             */
            id: number;
            /**
             * название истории
             */
            storyName: string;
            /**
             * статус заявки
             */
            status: string;
            /**
             * комментарий проверяющего
             */
            comment: string;
            /**
             * ид пользователя, создавшего заявку
             */
            userId: number;
        }
        export interface AddTextStoryDto {
            /**
             *
             */
            text: string;
        }
        export interface AddTypeRequestDto {
            /**
             *
             */
            name: string;
        }
        export interface ApprovedUserAudioDto {
            /**
             * storyAudioId(ид опубликованной озвучки)
             */
            id: number;
            /**
             * данные озвучки пользователя
             */
            userAudio: {
                /**
                 *
                 */
                name: string;
                /**
                 *
                 */
                languageId: number;
                /**
                 * userAudioId
                 */
                id: number;
            };
            /**
             * id пользователя(автора)
             */
            author: number;
            /**
             * storyAudioId(ид опубликованной озвучки)
             */
            story: {
                /**
                 * название истории
                 */
                name: string;
                /**
                 * id сказки
                 */
                id: number;
                /**
                 * id аудиозаписи
                 */
                audioId: number | null;
                /**
                 * id этнической группы
                 */
                ethnicGroup: {
                    /**
                     *
                     */
                    name: string;
                    /**
                     *
                     */
                    languageId: number;
                    /**
                     *
                     */
                    id: number;
                };
            };
        }
        export interface AudioStoryLanguageDto {
            /**
             * audioStoryId
             */
            id: number;
            /**
             * ид озвучки пользователя
             */
            userAudioId: number;
            /**
             * средняя оценка озвучки
             */
            moderateScore: number;
            /**
             * информация о языке
             */
            language: {
                /**
                 *
                 */
                name: string;
                /**
                 *
                 */
                id: number;
            };
            /**
             * информация об авторе
             */
            authors: {
                /**
                 * номер пользователя
                 */
                id: number;
                /**
                 * имя пользователя
                 */
                firstName: string;
                /**
                 * фамилия пользователя
                 */
                lastName: string;
            };
        }
        export interface AudioStoryRequestEntity {
            id: number;
            userId: number;
            userAudioId: number;
            status: string;
            typeId: number;
            storyId: number;
            comment: string;
        }
        export interface AuthorUserDto {
            /**
             * номер пользователя
             */
            id: number;
            /**
             * имя пользователя
             */
            firstName: string;
            /**
             * фамилия пользователя
             */
            lastName: string;
        }
        export interface BadRequestDto {
            /**
             *
             */
            statusCode: number;
            /**
             *
             */
            message: string[];
            /**
             *
             */
            error: string;
        }
        export interface BaseRequestExceptionDto {
            /**
             *
             */
            statusCode: number;
        }
        export interface BaseUserAudioDto {
            /**
             *
             */
            name: string;
            /**
             *
             */
            languageId: number;
        }
        export interface Buffer {
        }
        export interface ConstituentDto {
            /**
             *
             */
            name: string;
            /**
             *
             */
            id: number;
        }
        export interface ConstituentFilledDto {
            /**
             *
             */
            constituentId: number;
            /**
             *
             */
            ethnicGroupCount: number;
            /**
             *
             */
            filled: number;
        }
        export interface CreateAddStoryRequestDto {
            /**
             * название истории
             */
            storyName: string;
        }
        export interface CreatedImageStoryDto {
            /**
             * ид сказки
             */
            storyId: number;
            /**
             * номер изображения(storyImageId)
             */
            id: number;
        }
        export interface DeleteEthnicGroupToConstituentDto {
            /**
             *
             */
            constituentRfId: number;
            /**
             *
             */
            ethnicGroupId: number;
        }
        export interface EditAddStoryRequestDto {
            /**
             * статус заявки берется является ENUM
             */
            status: "SEND" | "SUCCESSED" | "CANCELLED";
            /**
             * комментарий
             */
            comment: string;
        }
        export interface EditAudioStoryRequestDto {
            /**
             *
             */
            comment: string;
            /**
             *
             */
            status: string;
        }
        export interface EditConstituentDto {
            /**
             *
             */
            name: string;
            /**
             *
             */
            languageId: number;
        }
        export interface EditEthnicGroupDto {
            /**
             *
             */
            name: string;
            /**
             *
             */
            languageId: number;
        }
        export interface EditStoryDto {
            /**
             * название истории
             */
            name: string;
            /**
             * id этнической группы
             */
            ethnicGroupId: number;
            /**
             * текст сказки
             */
            text: string;
        }
        export interface EditTypeRequestDto {
            /**
             *
             */
            name: string;
        }
        export interface EthnicGroupDto {
            /**
             *
             */
            name: string;
            /**
             *
             */
            languageId: number;
            /**
             *
             */
            id: number;
        }
        export interface EthnicGroupLanguageDto {
            /**
             *
             */
            id: number;
            /**
             *
             */
            name: string;
            /**
             *
             */
            language: {
                /**
                 *
                 */
                name: string;
                /**
                 *
                 */
                id: number;
            };
        }
        export interface EthnicGroupMapDto {
            /**
             * географическая долгота
             */
            longitude: number;
            /**
             * географическая широта
             */
            latitude: number;
            /**
             *
             */
            id: number;
            /**
             *
             */
            constituentId: number;
        }
        export interface EthnicGroupMapPointEntity {
            /**
             *
             */
            id: number;
            /**
             *
             */
            ethnicGroupId: number;
            /**
             *
             */
            longitude: number;
            /**
             *
             */
            latitude: number;
        }
        export interface EthnicGroupMapPointEntityWithConstituents {
            /**
             *
             */
            id: number;
            /**
             *
             */
            ethnicGroupId: number;
            /**
             *
             */
            longitude: number;
            /**
             *
             */
            latitude: number;
            /**
             * объект региона
             */
            constituent: {
                /**
                 *
                 */
                name: string;
                /**
                 *
                 */
                id: number;
            };
        }
        export interface EthnicGroupMapWithGroupDto {
            /**
             * географическая долгота
             */
            longitude: number;
            /**
             * географическая широта
             */
            latitude: number;
            /**
             * объект с этнической группой
             */
            ethnicGroup: {
                /**
                 *
                 */
                name: string;
                /**
                 *
                 */
                languageId: number;
                /**
                 *
                 */
                id: number;
            };
        }
        export interface EthnicGroupPointDto {
            /**
             * Уникальный идентификатор точки
             */
            idPoint: number;
            /**
             * Идентификатор этнической группы
             */
            ethnicGroupId: number;
            /**
             * Название этнической группы
             */
            ethnicGroupName: string;
            /**
             * Широта точки
             */
            latitude: number;
            /**
             * Долгота точки
             */
            longitude: number;
        }
        export interface EthnicGroupToConstituentDto {
            /**
             *
             */
            constituentRfId: number;
            /**
             *
             */
            ethnicGroupId: number;
            /**
             *
             */
            id: number;
        }
        export interface FeatureGeometryDto {
            /**
             * Тип геометрии
             */
            type: string;
            geometries: GeometryPropertiesDto[];
        }
        export interface FeatureGeometryPropertiesDto {
            /**
             * id
             */
            id: string;
            /**
             * feature topojson
             */
            name: string;
            /**
             * Shape group
             */
            shapeGroup: string;
            /**
             * Shape ID
             */
            shapeID: string;
            /**
             * Shape ISO
             */
            shapeISO: string;
            /**
             * Shape type
             */
            shapeType: string;
            /**
             * Точки с этническими группами
             */
            ethnicGroupsPoints: EthnicGroupPointDto[];
        }
        export interface GeometryCollectionDto {
            /**
             * Массив свойств объекта
             */
            map: FeatureGeometryDto[];
        }
        export interface GeometryPropertiesDto {
            /**
             * массив с дугам
             * example:
             * [
             *   [
             *     398223,
             *     46698
             *   ]
             * ]
             */
            arcs: any[][];
            type: string;
            properties: FeatureGeometryPropertiesDto;
        }
        export interface ImageStoryDto {
            /**
             *
             */
            filename: string;
            /**
             *
             */
            buffer: {
                [key: string]: any;
            };
        }
        export interface LanguageDto {
            /**
             *
             */
            name: string;
            /**
             *
             */
            id: number;
        }
        export interface MapDto {
            /**
             * данные карты
             */
            data: {
                /**
                 * тип
                 */
                type: string;
                /**
                 * массив с дугам
                 * example:
                 * [
                 *   [
                 *     398223,
                 *     46698
                 *   ]
                 * ]
                 */
                arcs: any[][];
                /**
                 * объект преобразования
                 */
                transform: {
                    /**
                     * example:
                     * [
                     *   0.322,
                     *   0.943
                     * ]
                     */
                    scale: any[][];
                    /**
                     * example:
                     * [
                     *   0.322,
                     *   0.943
                     * ]
                     */
                    translate: any[][];
                };
                /**
                 * Коллекция с геометрией карты
                 */
                objects: {
                    /**
                     * Массив свойств объекта
                     */
                    map: FeatureGeometryDto[];
                };
            };
        }
        export interface MapTopologyDto {
            /**
             * тип
             */
            type: string;
            /**
             * массив с дугам
             * example:
             * [
             *   [
             *     398223,
             *     46698
             *   ]
             * ]
             */
            arcs: any[][];
            /**
             * объект преобразования
             */
            transform: {
                /**
                 * example:
                 * [
                 *   0.322,
                 *   0.943
                 * ]
                 */
                scale: any[][];
                /**
                 * example:
                 * [
                 *   0.322,
                 *   0.943
                 * ]
                 */
                translate: any[][];
            };
            /**
             * Коллекция с геометрией карты
             */
            objects: {
                /**
                 * Массив свойств объекта
                 */
                map: FeatureGeometryDto[];
            };
        }
        export interface RatingAudioStoryDto {
            /**
             * номер озвучки
             */
            audioId: number;
            /**
             * среднее значение озвучки
             */
            ratingAudio: number;
        }
        export interface SignInRequestDto {
            /**
             *
             */
            email: string;
            /**
             *
             */
            password: string;
        }
        export interface SignUpRequestDto {
            /**
             *
             */
            email: string;
            /**
             *
             */
            password: string;
            /**
             *
             */
            firstName: string;
            /**
             *
             */
            lastName: string;
        }
        export interface StoryDto {
            /**
             * название истории
             */
            name: string;
            /**
             * id сказки
             */
            id: number;
            /**
             * id аудиозаписи
             */
            audioId: number | null;
            /**
             * id этнической группы
             */
            ethnicGroup: {
                /**
                 *
                 */
                name: string;
                /**
                 *
                 */
                languageId: number;
                /**
                 *
                 */
                id: number;
            };
        }
        export interface StoryWithTextDto {
            /**
             * название истории
             */
            name: string;
            /**
             * id сказки
             */
            id: number;
            /**
             * id аудиозаписи
             */
            audioId: number | null;
            /**
             * id этнической группы
             */
            ethnicGroup: {
                /**
                 *
                 */
                name: string;
                /**
                 *
                 */
                languageId: number;
                /**
                 *
                 */
                id: number;
            };
            /**
             * текст сказки
             */
            text: string;
        }
        export interface StreamableFile {
        }
        export interface TextStoryDto {
            /**
             *
             */
            text: string;
            /**
             *
             */
            id: number;
        }
        export interface TokensResponseDto {
            /**
             * access token
             */
            accessToken: string;
            /**
             * refresh token
             */
            refreshToken: string;
        }
        export interface TransformDto {
            /**
             * example:
             * [
             *   0.322,
             *   0.943
             * ]
             */
            scale: any[][];
            /**
             * example:
             * [
             *   0.322,
             *   0.943
             * ]
             */
            translate: any[][];
        }
        export interface TypeRequestDto {
            /**
             *
             */
            name: string;
            /**
             *
             */
            id: number;
        }
        export interface UserAudioDto {
            /**
             *
             */
            name: string;
            /**
             *
             */
            languageId: number;
            /**
             * userAudioId
             */
            id: number;
        }
        export interface UserResponseDto {
            /**
             *
             */
            firstName: string;
            /**
             *
             */
            lastName: string;
            /**
             *
             */
            email: string;
            /**
             *
             */
            role: string;
            /**
             *
             */
            id: number;
        }
        export interface ValidationExceptionResponseDto {
            /**
             * статус код
             */
            statusCode: number;
            /**
             * описание ошибки
             */
            message: string;
            /**
             * объекто с полями и массивом ошибок их
             * example:
             * {
             *   "propertyName": [
             *     "message1",
             *     "message2"
             *   ]
             * }
             */
            validationErrors: {
                [key: string]: any;
            };
        }
    }
}
export declare namespace Paths {
    namespace AddStoryRequestControllerCreateAddStoryRequestForCurrentUser {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
        }
        export type RequestBody = Components.Schemas.CreateAddStoryRequestDto;
        namespace Responses {
            export type $200 = Components.Schemas.AddStoryRequestDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AddStoryRequestControllerDeleteAddStoryRequestById {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type AddStoryRequestId = number;
            export type Authorization = string;
        }
        export interface PathParameters {
            addStoryRequestId: Parameters.AddStoryRequestId;
        }
        namespace Responses {
            export interface $200 {
            }
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AddStoryRequestControllerEditStatusAddStoryReqeust {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type AddStoryRequestId = number;
            export type Authorization = string;
        }
        export interface PathParameters {
            addStoryRequestId: Parameters.AddStoryRequestId;
        }
        export type RequestBody = Components.Schemas.EditAddStoryRequestDto;
        namespace Responses {
            export type $200 = Components.Schemas.AddStoryRequestEntity;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AddStoryRequestControllerGetAddStoryRequestAll {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type Count = number;
            export type Start = number;
        }
        export interface QueryParameters {
            start: Parameters.Start;
            count: Parameters.Count;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AddStoryRequestEntity[];
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AddStoryRequestControllerGetAddStoryRequestByUserId {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type UserId = number;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AddStoryRequestDto[];
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AddStoryRequestControllerGetAddStoryRequestForCurrentUser {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AddStoryRequestDto[];
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AdminControllerAddEthnicalGroupPoint {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type ConstituentId = number;
            export type EthnicGroupId = number;
        }
        export interface PathParameters {
            ethnicGroupId: Parameters.EthnicGroupId;
            constituentId: Parameters.ConstituentId;
        }
        export type RequestBody = Components.Schemas.AddEthnicGroupMapDto;
        namespace Responses {
            export type $200 = Components.Schemas.EthnicGroupMapDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AdminControllerAddStory {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
        }
        export type RequestBody = Components.Schemas.AddStoryDto;
        namespace Responses {
            export type $200 = Components.Schemas.StoryWithTextDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AdminControllerAddTextStory {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
        }
        export type RequestBody = Components.Schemas.AddTextStoryDto;
        namespace Responses {
            export type $200 = Components.Schemas.TextStoryDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AdminControllerDeleteEthnicalGroupPoint {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type PointId = number;
        }
        export interface PathParameters {
            pointId: Parameters.PointId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.EthnicGroupMapDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AdminControllerDeleteStoryById {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type StoryId = number;
        }
        export interface PathParameters {
            storyId: Parameters.StoryId;
        }
        namespace Responses {
            export interface $200 {
            }
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AdminControllerEditSotry {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type StoryId = number;
        }
        export interface PathParameters {
            storyId: Parameters.StoryId;
        }
        export type RequestBody = Components.Schemas.EditStoryDto;
        namespace Responses {
            export type $200 = Components.Schemas.StoryDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AudioStoryRequestControllerCreateAddAudioRequest {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
        }
        export type RequestBody = Components.Schemas.AddAudioStoryRequestDto;
        namespace Responses {
            export type $200 = Components.Schemas.AudioStoryRequestEntity;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AudioStoryRequestControllerDeleteAudioStoryRequestBydId {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type AudioStoryRequestId = number;
            export type Authorization = string;
        }
        export interface PathParameters {
            audioStoryRequestId: Parameters.AudioStoryRequestId;
        }
        namespace Responses {
            export interface $200 {
            }
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AudioStoryRequestControllerEditAudioStoryRequest {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type AudioStoryReqeustId = number;
            export type Authorization = string;
        }
        export interface PathParameters {
            audioStoryReqeustId: Parameters.AudioStoryReqeustId;
        }
        export type RequestBody = Components.Schemas.EditAudioStoryRequestDto;
        namespace Responses {
            export type $200 = Components.Schemas.AudioStoryRequestEntity;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AudioStoryRequestControllerGetAllAudioStoryReqeustsByUserId {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type UserId = number;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AudioStoryRequestEntity[];
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AudioStoryRequestControllerGetAllAudioStoryRequests {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AudioStoryRequestEntity[];
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AudioStoryRequestControllerGetAllAudioStoryRequestsCurrentUser {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AudioStoryRequestEntity[];
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AuthControllerLogout {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
        }
        namespace Responses {
            export interface $200 {
            }
            export type $400 = Components.Schemas.BadRequestDto;
            export type $401 = Components.Schemas.BaseRequestExceptionDto;
        }
    }
    namespace AuthControllerRefresh {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
        }
        namespace Responses {
            export type $200 = Components.Schemas.TokensResponseDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AuthControllerSignIn {
        export type RequestBody = Components.Schemas.SignInRequestDto;
        namespace Responses {
            export type $200 = Components.Schemas.TokensResponseDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AuthControllerSignUp {
        export type RequestBody = Components.Schemas.SignUpRequestDto;
        namespace Responses {
            export type $201 = Components.Schemas.TokensResponseDto;
            export type $400 = Components.Schemas.ValidationExceptionResponseDto;
            export interface $401 {
            }
        }
    }
    namespace ConstituentsControllerAddConstituent {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
        }
        export type RequestBody = Components.Schemas.AddConstituentDto;
        namespace Responses {
            export type $200 = Components.Schemas.ConstituentDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace ConstituentsControllerAddEthnicGroupToConstituent {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
        }
        export type RequestBody = Components.Schemas.AddEthnicGroupToConstituentDto;
        namespace Responses {
            export type $200 = Components.Schemas.EthnicGroupToConstituentDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace ConstituentsControllerDeleteConstituentById {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
            }
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace ConstituentsControllerDeleteEthnicGroupFromConstituent {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
        }
        export type RequestBody = Components.Schemas.DeleteEthnicGroupToConstituentDto;
        namespace Responses {
            export type $200 = Components.Schemas.EthnicGroupToConstituentDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace ConstituentsControllerEditConstituent {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
        }
        export type RequestBody = Components.Schemas.EditConstituentDto;
        namespace Responses {
            export interface $200 {
            }
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace ConstituentsControllerGetConstituents {
        namespace Responses {
            export type $200 = Components.Schemas.ConstituentDto[];
            export interface $400 {
            }
        }
    }
    namespace ConstituentsControllerGetEthnicGroupByConstituentId {
        namespace Parameters {
            export type ConstituentId = number;
        }
        export interface PathParameters {
            constituentId: Parameters.ConstituentId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.EthnicGroupToConstituentDto[];
            export interface $400 {
            }
        }
    }
    namespace EthnicGroupControllerAddEthnicGroup {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
        }
        export type RequestBody = Components.Schemas.AddEthnicGroupDto;
        namespace Responses {
            export type $200 = Components.Schemas.EthnicGroupDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace EthnicGroupControllerAddLanguage {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
        }
        export type RequestBody = Components.Schemas.AddLanguageDto;
        namespace Responses {
            export type $200 = Components.Schemas.EthnicGroupDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace EthnicGroupControllerDeleteEthnicGroup {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
            }
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace EthnicGroupControllerDeleteLanguageById {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
            }
            export interface $400 {
            }
        }
    }
    namespace EthnicGroupControllerEditEthnicGroup {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.EditEthnicGroupDto;
        namespace Responses {
            export type $200 = Components.Schemas.EthnicGroupDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace EthnicGroupControllerEthnicGroups {
        namespace Responses {
            export type $200 = Components.Schemas.EthnicGroupLanguageDto[];
            export interface $400 {
            }
        }
    }
    namespace EthnicGroupControllerGetAllLanguage {
        namespace Responses {
            export type $200 = Components.Schemas.LanguageDto[];
            export interface $400 {
            }
            export interface $403 {
            }
        }
    }
    namespace EthnicGroupControllerGetEthnicGroupById {
        namespace Parameters {
            export type EthnicGroupId = number;
        }
        export interface PathParameters {
            ethnicGroupId: Parameters.EthnicGroupId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.EthnicGroupDto;
            export interface $400 {
            }
        }
    }
    namespace MapControllerDeleteEthnicalGroupPoint {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type PointId = number;
        }
        export interface PathParameters {
            pointId: Parameters.PointId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.EthnicGroupMapDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace MapControllerGetEthnicGroupPointsByName {
        namespace Parameters {
            export type Name = string;
        }
        export interface PathParameters {
            name: Parameters.Name;
        }
        namespace Responses {
            export type $200 = Components.Schemas.EthnicGroupMapPointEntityWithConstituents[];
        }
    }
    namespace MapControllerGetEthnicalGroupPoints {
        namespace Responses {
            export type $200 = Components.Schemas.EthnicGroupMapWithGroupDto[];
            export interface $400 {
            }
        }
    }
    namespace MapControllerGetEthnicalGroupPointsByConstituentId {
        namespace Parameters {
            export type ConstituentId = number;
        }
        export interface PathParameters {
            constituentId: Parameters.ConstituentId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.EthnicGroupMapPointEntity[];
            export interface $400 {
            }
        }
    }
    namespace MapControllerGetMapTopojson {
        namespace Responses {
            export type $200 = Components.Schemas.MapDto;
            export interface $400 {
            }
        }
    }
    namespace MapControllerGetPercentsFilledStoriesByConstituentId {
        namespace Responses {
            export type $200 = Components.Schemas.ConstituentFilledDto[];
            export interface $400 {
            }
        }
    }
    namespace RequestControllerAddTypeRequest {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
        }
        export type RequestBody = Components.Schemas.AddTypeRequestDto;
        namespace Responses {
            export type $200 = Components.Schemas.TypeRequestDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace RequestControllerDeleteTypeRequestById {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type TypeRequestId = number;
        }
        export interface PathParameters {
            typeRequestId: Parameters.TypeRequestId;
        }
        namespace Responses {
            export interface $200 {
            }
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace RequestControllerEditTypeRequest {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type TypeRequestId = number;
        }
        export interface PathParameters {
            typeRequestId: Parameters.TypeRequestId;
        }
        export type RequestBody = Components.Schemas.EditTypeRequestDto;
        namespace Responses {
            export type $200 = Components.Schemas.TypeRequestDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace RequestControllerGetAllRequestTypes {
        namespace Responses {
            export type $200 = Components.Schemas.TypeRequestDto[];
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace RequestControllerGetRequestStatuses {
        namespace Responses {
            export type $200 = string[];
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace RequestControllerGetTypeRequestById {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type TypeRequestId = number;
        }
        export interface PathParameters {
            typeRequestId: Parameters.TypeRequestId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.TypeRequestDto[];
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace StoryControllerAddRatingForStoryByCurrentUser {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
        }
        export type RequestBody = Components.Schemas.AddRatingAudioStoryDto;
        namespace Responses {
            export interface $200 {
            }
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace StoryControllerDeleteStoryImgByStoryId {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type StoryId = number;
        }
        export interface PathParameters {
            storyId: Parameters.StoryId;
        }
        namespace Responses {
            export interface $200 {
            }
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace StoryControllerGetAllStories {
        namespace Responses {
            export type $200 = Components.Schemas.StoryDto[];
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace StoryControllerGetAudioStoryById {
        namespace Parameters {
            export type AudioId = number;
        }
        export interface PathParameters {
            audioId: Parameters.AudioId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.StreamableFile;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace StoryControllerGetImgStoryById {
        namespace Parameters {
            export type StoryId = number;
        }
        export interface PathParameters {
            storyId: Parameters.StoryId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ImageStoryDto;
            export interface $400 {
            }
            export interface $401 {
            }
            export interface $404 {
            }
        }
    }
    namespace StoryControllerGetLanguagesForCurrentStory {
        namespace Parameters {
            export type StoryId = number;
        }
        export interface PathParameters {
            storyId: Parameters.StoryId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AudioStoryLanguageDto[];
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace StoryControllerGetRatingByAudioId {
        namespace Parameters {
            export type AudioId = number;
        }
        export interface PathParameters {
            audioId: Parameters.AudioId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.RatingAudioStoryDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace StoryControllerGetRatingByAudioIdForCurrentUser {
        namespace Parameters {
            export type UserAudioId = number;
        }
        export interface PathParameters {
            userAudioId: Parameters.UserAudioId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.RatingAudioStoryDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace StoryControllerGetStoriesByEthnicGroupId {
        namespace Parameters {
            export type EthnicGroupId = number;
        }
        export interface PathParameters {
            ethnicGroupId: Parameters.EthnicGroupId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.StoryDto[];
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace StoryControllerGetStoryById {
        namespace Parameters {
            export type StoryId = number;
        }
        export interface PathParameters {
            storyId: Parameters.StoryId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.StoryDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace StoryControllerGetStoryByName {
        namespace Parameters {
            export type Name = string;
        }
        export interface PathParameters {
            name: Parameters.Name;
        }
        namespace Responses {
            export type $200 = Components.Schemas.StoryDto[];
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace StoryControllerGetTextStoryByStoryId {
        namespace Parameters {
            export type StoryId = number;
        }
        export interface PathParameters {
            storyId: Parameters.StoryId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.TextStoryDto;
            export interface $400 {
            }
        }
    }
    namespace StoryControllerSetUserAudioToStory {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type StoryId = number;
        }
        export interface QueryParameters {
            storyId: Parameters.StoryId;
        }
        export type RequestBody = Components.Schemas.AddAudioStoryDto;
        namespace Responses {
            export interface $200 {
            }
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace StoryControllerUploadStoryImage {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type StoryId = number;
        }
        export interface PathParameters {
            storyId: Parameters.StoryId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CreatedImageStoryDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace UserAudioControllerDeleteUserAudioById {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type UserAudioId = number;
        }
        export interface PathParameters {
            userAudioId: Parameters.UserAudioId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.BaseUserAudioDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace UserAudioControllerGetApprovedUserAudiosCurrentUser {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ApprovedUserAudioDto[];
            export interface $400 {
            }
        }
    }
    namespace UserAudioControllerGetCurrentUserAudios {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
        }
        namespace Responses {
            export type $200 = Components.Schemas.UserAudioDto[];
            export interface $400 {
            }
        }
    }
    namespace UserAudioControllerGetUserAudioById {
        namespace Parameters {
            export type UserAudioId = number;
        }
        export interface PathParameters {
            userAudioId: Parameters.UserAudioId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.StreamableFile;
            export interface $400 {
            }
        }
    }
    namespace UserAudioControllerUploadUserAudio {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type LanguageId = number;
        }
        export interface PathParameters {
            languageId: Parameters.LanguageId;
        }
        export interface RequestBody {
            file?: string; // binary
        }
        namespace Responses {
            export type $200 = Components.Schemas.UserAudioDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace UserControllerDeleteUser {
        namespace Parameters {
            export type UserId = number;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.UserResponseDto;
            export interface $400 {
            }
            export interface $401 {
            }
            export interface $404 {
            }
        }
    }
    namespace UserControllerFindUserById {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type UserId = number;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.UserResponseDto;
            export interface $400 {
            }
            export interface $401 {
            }
            export interface $404 {
            }
        }
    }
    namespace UserControllerGetCurrentUserInfo {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
        }
        namespace Responses {
            export type $200 = Components.Schemas.UserResponseDto;
            export interface $400 {
            }
            export interface $401 {
            }
            export interface $404 {
            }
        }
    }
}
export interface OperationMethods {
  /**
   * AuthController_signUp - регистрация
   */
  'AuthController_signUp'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AuthControllerSignUp.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthControllerSignUp.Responses.$201>
  /**
   * AuthController_signIn - вход
   */
  'AuthController_signIn'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AuthControllerSignIn.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthControllerSignIn.Responses.$200>
  /**
   * AuthController_refresh -  на обновление access token
   */
  'AuthController_refresh'(
    parameters?: Parameters<Paths.AuthControllerRefresh.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthControllerRefresh.Responses.$200>
  /**
   * AuthController_logout - выход из системы
   */
  'AuthController_logout'(
    parameters?: Parameters<Paths.AuthControllerLogout.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthControllerLogout.Responses.$200>
  /**
   * UserController_getCurrentUserInfo - получение информации о текущем пользователе
   */
  'UserController_getCurrentUserInfo'(
    parameters?: Parameters<Paths.UserControllerGetCurrentUserInfo.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserControllerGetCurrentUserInfo.Responses.$200>
  /**
   * UserController_findUserById - получение информации о пользователе по его id
   * 
   * необходима роль администратора
   */
  'UserController_findUserById'(
    parameters?: Parameters<Paths.UserControllerFindUserById.PathParameters & Paths.UserControllerFindUserById.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserControllerFindUserById.Responses.$200>
  /**
   * UserController_deleteUser - удаленеи пользователя по его id
   * 
   * необходима роль администратора
   */
  'UserController_deleteUser'(
    parameters?: Parameters<Paths.UserControllerDeleteUser.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserControllerDeleteUser.Responses.$200>
  /**
   * ConstituentsController_addConstituent - добавление субъекта РФ
   * 
   * необходима роль администратора
   */
  'ConstituentsController_addConstituent'(
    parameters?: Parameters<Paths.ConstituentsControllerAddConstituent.HeaderParameters> | null,
    data?: Paths.ConstituentsControllerAddConstituent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ConstituentsControllerAddConstituent.Responses.$200>
  /**
   * ConstituentsController_addEthnicGroupToConstituent - добавление этнической группы к субъекту рф
   * 
   * небходима роль администратора
   */
  'ConstituentsController_addEthnicGroupToConstituent'(
    parameters?: Parameters<Paths.ConstituentsControllerAddEthnicGroupToConstituent.HeaderParameters> | null,
    data?: Paths.ConstituentsControllerAddEthnicGroupToConstituent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ConstituentsControllerAddEthnicGroupToConstituent.Responses.$200>
  /**
   * ConstituentsController_deleteEthnicGroupFromConstituent - удаление этнической группы у субъекта рф
   * 
   * необходима роль администратора
   */
  'ConstituentsController_deleteEthnicGroupFromConstituent'(
    parameters?: Parameters<Paths.ConstituentsControllerDeleteEthnicGroupFromConstituent.HeaderParameters> | null,
    data?: Paths.ConstituentsControllerDeleteEthnicGroupFromConstituent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ConstituentsControllerDeleteEthnicGroupFromConstituent.Responses.$200>
  /**
   * ConstituentsController_getEthnicGroupByConstituentId - получение этнической группы, принадлежащей субъекту рф
   */
  'ConstituentsController_getEthnicGroupByConstituentId'(
    parameters?: Parameters<Paths.ConstituentsControllerGetEthnicGroupByConstituentId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ConstituentsControllerGetEthnicGroupByConstituentId.Responses.$200>
  /**
   * ConstituentsController_getConstituents - получение всех субъектов
   */
  'ConstituentsController_getConstituents'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ConstituentsControllerGetConstituents.Responses.$200>
  /**
   * ConstituentsController_editConstituent - редактирование субъекта
   * 
   * небходима роль администратора
   */
  'ConstituentsController_editConstituent'(
    parameters?: Parameters<Paths.ConstituentsControllerEditConstituent.HeaderParameters> | null,
    data?: Paths.ConstituentsControllerEditConstituent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ConstituentsControllerEditConstituent.Responses.$200>
  /**
   * ConstituentsController_deleteConstituentById - удаление данных субъекта
   * 
   * необходима роль администратора
   */
  'ConstituentsController_deleteConstituentById'(
    parameters?: Parameters<Paths.ConstituentsControllerDeleteConstituentById.PathParameters & Paths.ConstituentsControllerDeleteConstituentById.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ConstituentsControllerDeleteConstituentById.Responses.$200>
  /**
   * EthnicGroupController_addEthnicGroup - добавление этнической группы
   * 
   * необходима роль администратора
   */
  'EthnicGroupController_addEthnicGroup'(
    parameters?: Parameters<Paths.EthnicGroupControllerAddEthnicGroup.HeaderParameters> | null,
    data?: Paths.EthnicGroupControllerAddEthnicGroup.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.EthnicGroupControllerAddEthnicGroup.Responses.$200>
  /**
   * EthnicGroupController_ethnicGroups - получение списка этнических групп
   */
  'EthnicGroupController_ethnicGroups'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.EthnicGroupControllerEthnicGroups.Responses.$200>
  /**
   * EthnicGroupController_getEthnicGroupById - получение этнической группы по ethnicGroupId
   */
  'EthnicGroupController_getEthnicGroupById'(
    parameters?: Parameters<Paths.EthnicGroupControllerGetEthnicGroupById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.EthnicGroupControllerGetEthnicGroupById.Responses.$200>
  /**
   * EthnicGroupController_editEthnicGroup - редактирование этнической группы
   * 
   * необходима роль администратора
   */
  'EthnicGroupController_editEthnicGroup'(
    parameters?: Parameters<Paths.EthnicGroupControllerEditEthnicGroup.PathParameters & Paths.EthnicGroupControllerEditEthnicGroup.HeaderParameters> | null,
    data?: Paths.EthnicGroupControllerEditEthnicGroup.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.EthnicGroupControllerEditEthnicGroup.Responses.$200>
  /**
   * EthnicGroupController_deleteEthnicGroup - удаление этнической группы
   * 
   * необходима роль администратора
   */
  'EthnicGroupController_deleteEthnicGroup'(
    parameters?: Parameters<Paths.EthnicGroupControllerDeleteEthnicGroup.PathParameters & Paths.EthnicGroupControllerDeleteEthnicGroup.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.EthnicGroupControllerDeleteEthnicGroup.Responses.$200>
  /**
   * EthnicGroupController_addLanguage - добавление языка этнической группы
   * 
   * необходима роль администратора
   */
  'EthnicGroupController_addLanguage'(
    parameters?: Parameters<Paths.EthnicGroupControllerAddLanguage.HeaderParameters> | null,
    data?: Paths.EthnicGroupControllerAddLanguage.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.EthnicGroupControllerAddLanguage.Responses.$200>
  /**
   * EthnicGroupController_getAllLanguage - получение списка всех языков
   */
  'EthnicGroupController_getAllLanguage'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.EthnicGroupControllerGetAllLanguage.Responses.$200>
  /**
   * EthnicGroupController_deleteLanguageById - удаление языка по id
   * 
   * необходима роль администратора
   */
  'EthnicGroupController_deleteLanguageById'(
    parameters?: Parameters<Paths.EthnicGroupControllerDeleteLanguageById.PathParameters & Paths.EthnicGroupControllerDeleteLanguageById.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.EthnicGroupControllerDeleteLanguageById.Responses.$200>
  /**
   * MapController_getMapTopojson - получить данные для отрисовки карты
   */
  'MapController_getMapTopojson'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MapControllerGetMapTopojson.Responses.$200>
  /**
   * MapController_getEthnicalGroupPoints - получение точек этнических групп на карте
   */
  'MapController_getEthnicalGroupPoints'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MapControllerGetEthnicalGroupPoints.Responses.$200>
  /**
   * MapController_getEthnicalGroupPointsByConstituentId - получение точек этнических групп по номеру региона
   */
  'MapController_getEthnicalGroupPointsByConstituentId'(
    parameters?: Parameters<Paths.MapControllerGetEthnicalGroupPointsByConstituentId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MapControllerGetEthnicalGroupPointsByConstituentId.Responses.$200>
  /**
   * MapController_getEthnicGroupPointsByName - получение точек этнических групп по названию этнической группы
   */
  'MapController_getEthnicGroupPointsByName'(
    parameters?: Parameters<Paths.MapControllerGetEthnicGroupPointsByName.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MapControllerGetEthnicGroupPointsByName.Responses.$200>
  /**
   * MapController_deleteEthnicalGroupPoint - удаление точки этнической группы
   * 
   * необходима роль администратора
   */
  'MapController_deleteEthnicalGroupPoint'(
    parameters?: Parameters<Paths.MapControllerDeleteEthnicalGroupPoint.PathParameters & Paths.MapControllerDeleteEthnicalGroupPoint.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MapControllerDeleteEthnicalGroupPoint.Responses.$200>
  /**
   * MapController_getPercentsFilledStoriesByConstituentId - получение списка субъектов и их заполненности озвучками
   */
  'MapController_getPercentsFilledStoriesByConstituentId'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MapControllerGetPercentsFilledStoriesByConstituentId.Responses.$200>
  /**
   * AdminController_addEthnicalGroupPoint - добавление точки этнической группы на карту
   * 
   * необходима роль администратора
   */
  'AdminController_addEthnicalGroupPoint'(
    parameters?: Parameters<Paths.AdminControllerAddEthnicalGroupPoint.PathParameters & Paths.AdminControllerAddEthnicalGroupPoint.HeaderParameters> | null,
    data?: Paths.AdminControllerAddEthnicalGroupPoint.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AdminControllerAddEthnicalGroupPoint.Responses.$200>
  /**
   * AdminController_deleteEthnicalGroupPoint - удаление точки этнической группы
   * 
   * необходима роль администратора
   */
  'AdminController_deleteEthnicalGroupPoint'(
    parameters?: Parameters<Paths.AdminControllerDeleteEthnicalGroupPoint.PathParameters & Paths.AdminControllerDeleteEthnicalGroupPoint.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AdminControllerDeleteEthnicalGroupPoint.Responses.$200>
  /**
   * AdminController_addStory - добавление сказки
   */
  'AdminController_addStory'(
    parameters?: Parameters<Paths.AdminControllerAddStory.HeaderParameters> | null,
    data?: Paths.AdminControllerAddStory.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AdminControllerAddStory.Responses.$200>
  /**
   * AdminController_editSotry - редактирование сказки
   */
  'AdminController_editSotry'(
    parameters?: Parameters<Paths.AdminControllerEditSotry.PathParameters & Paths.AdminControllerEditSotry.HeaderParameters> | null,
    data?: Paths.AdminControllerEditSotry.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AdminControllerEditSotry.Responses.$200>
  /**
   * AdminController_deleteStoryById - удаление сказки
   */
  'AdminController_deleteStoryById'(
    parameters?: Parameters<Paths.AdminControllerDeleteStoryById.PathParameters & Paths.AdminControllerDeleteStoryById.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AdminControllerDeleteStoryById.Responses.$200>
  /**
   * AdminController_addTextStory - добавление текста сказки
   */
  'AdminController_addTextStory'(
    parameters?: Parameters<Paths.AdminControllerAddTextStory.HeaderParameters> | null,
    data?: Paths.AdminControllerAddTextStory.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AdminControllerAddTextStory.Responses.$200>
  /**
   * StoryController_getAllStories - получение всех сказок
   */
  'StoryController_getAllStories'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StoryControllerGetAllStories.Responses.$200>
  /**
   * StoryController_getStoryByName - получение сказок в которых есть подстрока name
   */
  'StoryController_getStoryByName'(
    parameters?: Parameters<Paths.StoryControllerGetStoryByName.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StoryControllerGetStoryByName.Responses.$200>
  /**
   * StoryController_getStoryById - получение общей информации о выбранной сказке
   */
  'StoryController_getStoryById'(
    parameters?: Parameters<Paths.StoryControllerGetStoryById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StoryControllerGetStoryById.Responses.$200>
  /**
   * StoryController_getLanguagesForCurrentStory - получение доступных языков озвучки для выбранной сказки
   */
  'StoryController_getLanguagesForCurrentStory'(
    parameters?: Parameters<Paths.StoryControllerGetLanguagesForCurrentStory.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StoryControllerGetLanguagesForCurrentStory.Responses.$200>
  /**
   * StoryController_getStoriesByEthnicGroupId - получение всех сказок выбранной этнической группы
   */
  'StoryController_getStoriesByEthnicGroupId'(
    parameters?: Parameters<Paths.StoryControllerGetStoriesByEthnicGroupId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StoryControllerGetStoriesByEthnicGroupId.Responses.$200>
  /**
   * StoryController_getTextStoryByStoryId - получение текста сказки
   */
  'StoryController_getTextStoryByStoryId'(
    parameters?: Parameters<Paths.StoryControllerGetTextStoryByStoryId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StoryControllerGetTextStoryByStoryId.Responses.$200>
  /**
   * StoryController_getAudioStoryById - получение одобренной озвучки по audioId
   * 
   * возвращает StreamableFile
   */
  'StoryController_getAudioStoryById'(
    parameters?: Parameters<Paths.StoryControllerGetAudioStoryById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StoryControllerGetAudioStoryById.Responses.$200>
  /**
   * StoryController_setUserAudioToStory - добавление озвучки к сказке
   * 
   * пример запроса: /api/story/audio?storyId=8 | необходима роль администратора
   */
  'StoryController_setUserAudioToStory'(
    parameters?: Parameters<Paths.StoryControllerSetUserAudioToStory.QueryParameters & Paths.StoryControllerSetUserAudioToStory.HeaderParameters> | null,
    data?: Paths.StoryControllerSetUserAudioToStory.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StoryControllerSetUserAudioToStory.Responses.$200>
  /**
   * StoryController_getImgStoryById - получение обложки для сказки по storyId
   */
  'StoryController_getImgStoryById'(
    parameters?: Parameters<Paths.StoryControllerGetImgStoryById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StoryControllerGetImgStoryById.Responses.$200>
  /**
   * StoryController_uploadStoryImage - загрузка обложки для выбранной сказки
   * 
   * необходима роль администратора
   */
  'StoryController_uploadStoryImage'(
    parameters?: Parameters<Paths.StoryControllerUploadStoryImage.PathParameters & Paths.StoryControllerUploadStoryImage.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StoryControllerUploadStoryImage.Responses.$200>
  /**
   * StoryController_deleteStoryImgByStoryId - удаление обложки для выбранной сказки по storyId
   * 
   * необходима роль администратора
   */
  'StoryController_deleteStoryImgByStoryId'(
    parameters?: Parameters<Paths.StoryControllerDeleteStoryImgByStoryId.PathParameters & Paths.StoryControllerDeleteStoryImgByStoryId.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StoryControllerDeleteStoryImgByStoryId.Responses.$200>
  /**
   * StoryController_getRatingByAudioId - получение оценки для выбранной озвучки
   */
  'StoryController_getRatingByAudioId'(
    parameters?: Parameters<Paths.StoryControllerGetRatingByAudioId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StoryControllerGetRatingByAudioId.Responses.$200>
  /**
   * StoryController_getRatingByAudioIdForCurrentUser - получение оценки для выбранной озвучки для текущего пользователя
   */
  'StoryController_getRatingByAudioIdForCurrentUser'(
    parameters?: Parameters<Paths.StoryControllerGetRatingByAudioIdForCurrentUser.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StoryControllerGetRatingByAudioIdForCurrentUser.Responses.$200>
  /**
   * StoryController_addRatingForStoryByCurrentUser - добавление текущим пользователем оценки к озвучке по audioId
   */
  'StoryController_addRatingForStoryByCurrentUser'(
    parameters?: Parameters<Paths.StoryControllerAddRatingForStoryByCurrentUser.HeaderParameters> | null,
    data?: Paths.StoryControllerAddRatingForStoryByCurrentUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StoryControllerAddRatingForStoryByCurrentUser.Responses.$200>
  /**
   * UserAudioController_getCurrentUserAudios - получение озвучек текущего пользователя
   */
  'UserAudioController_getCurrentUserAudios'(
    parameters?: Parameters<Paths.UserAudioControllerGetCurrentUserAudios.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserAudioControllerGetCurrentUserAudios.Responses.$200>
  /**
   * UserAudioController_getApprovedUserAudiosCurrentUser - получение одобренных озвучек текущего пользователя
   */
  'UserAudioController_getApprovedUserAudiosCurrentUser'(
    parameters?: Parameters<Paths.UserAudioControllerGetApprovedUserAudiosCurrentUser.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserAudioControllerGetApprovedUserAudiosCurrentUser.Responses.$200>
  /**
   * UserAudioController_getUserAudioById - получение файла озвучки пользователя
   */
  'UserAudioController_getUserAudioById'(
    parameters?: Parameters<Paths.UserAudioControllerGetUserAudioById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserAudioControllerGetUserAudioById.Responses.$200>
  /**
   * UserAudioController_uploadUserAudio - загрузка озвучки пользователя для выбранного языка
   * 
   * в теле запроса(body) файл прикрепляется к полю file
   */
  'UserAudioController_uploadUserAudio'(
    parameters?: Parameters<Paths.UserAudioControllerUploadUserAudio.PathParameters & Paths.UserAudioControllerUploadUserAudio.HeaderParameters> | null,
    data?: Paths.UserAudioControllerUploadUserAudio.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserAudioControllerUploadUserAudio.Responses.$200>
  /**
   * UserAudioController_deleteUserAudioById - удаление озвучки пользователя
   * 
   * необходима роль администратора
   */
  'UserAudioController_deleteUserAudioById'(
    parameters?: Parameters<Paths.UserAudioControllerDeleteUserAudioById.PathParameters & Paths.UserAudioControllerDeleteUserAudioById.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserAudioControllerDeleteUserAudioById.Responses.$200>
  /**
   * AudioStoryRequestController_getAllAudioStoryRequestsCurrentUser - получение всех заявок на озвучки текущего пользователя
   */
  'AudioStoryRequestController_getAllAudioStoryRequestsCurrentUser'(
    parameters?: Parameters<Paths.AudioStoryRequestControllerGetAllAudioStoryRequestsCurrentUser.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AudioStoryRequestControllerGetAllAudioStoryRequestsCurrentUser.Responses.$200>
  /**
   * AudioStoryRequestController_getAllAudioStoryRequests - получение всех заявок на озвучки
   * 
   * необходимы роль модератора
   */
  'AudioStoryRequestController_getAllAudioStoryRequests'(
    parameters?: Parameters<Paths.AudioStoryRequestControllerGetAllAudioStoryRequests.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AudioStoryRequestControllerGetAllAudioStoryRequests.Responses.$200>
  /**
   * AudioStoryRequestController_getAllAudioStoryReqeustsByUserId - получение всех заявок на озвучки для выбранного пользователя.
   * 
   * Необходима роль модератора
   */
  'AudioStoryRequestController_getAllAudioStoryReqeustsByUserId'(
    parameters?: Parameters<Paths.AudioStoryRequestControllerGetAllAudioStoryReqeustsByUserId.PathParameters & Paths.AudioStoryRequestControllerGetAllAudioStoryReqeustsByUserId.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AudioStoryRequestControllerGetAllAudioStoryReqeustsByUserId.Responses.$200>
  /**
   * AudioStoryRequestController_createAddAudioRequest - Создание заявки на проверку озвучки
   */
  'AudioStoryRequestController_createAddAudioRequest'(
    parameters?: Parameters<Paths.AudioStoryRequestControllerCreateAddAudioRequest.HeaderParameters> | null,
    data?: Paths.AudioStoryRequestControllerCreateAddAudioRequest.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AudioStoryRequestControllerCreateAddAudioRequest.Responses.$200>
  /**
   * AudioStoryRequestController_editAudioStoryRequest - редактирование заявки на проверку озвучки
   * 
   * необходима роль модератора. после редактирования, отредактированная запись по вебсокету отправляется пользователю из userId(создавшему заявку) в событие с названием "statuses"
   */
  'AudioStoryRequestController_editAudioStoryRequest'(
    parameters?: Parameters<Paths.AudioStoryRequestControllerEditAudioStoryRequest.PathParameters & Paths.AudioStoryRequestControllerEditAudioStoryRequest.HeaderParameters> | null,
    data?: Paths.AudioStoryRequestControllerEditAudioStoryRequest.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AudioStoryRequestControllerEditAudioStoryRequest.Responses.$200>
  /**
   * AudioStoryRequestController_deleteAudioStoryRequestBydId - удаление заявки на проверку озвучки
   * 
   * необходима роль администратора
   */
  'AudioStoryRequestController_deleteAudioStoryRequestBydId'(
    parameters?: Parameters<Paths.AudioStoryRequestControllerDeleteAudioStoryRequestBydId.PathParameters & Paths.AudioStoryRequestControllerDeleteAudioStoryRequestBydId.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AudioStoryRequestControllerDeleteAudioStoryRequestBydId.Responses.$200>
  /**
   * RequestController_getAllRequestTypes - получение списка всех типов заявок
   */
  'RequestController_getAllRequestTypes'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RequestControllerGetAllRequestTypes.Responses.$200>
  /**
   * RequestController_getTypeRequestById - получение типа заявки по id
   */
  'RequestController_getTypeRequestById'(
    parameters?: Parameters<Paths.RequestControllerGetTypeRequestById.PathParameters & Paths.RequestControllerGetTypeRequestById.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RequestControllerGetTypeRequestById.Responses.$200>
  /**
   * RequestController_addTypeRequest - добавление типа заявки
   * 
   * необходима роль администратора
   */
  'RequestController_addTypeRequest'(
    parameters?: Parameters<Paths.RequestControllerAddTypeRequest.HeaderParameters> | null,
    data?: Paths.RequestControllerAddTypeRequest.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RequestControllerAddTypeRequest.Responses.$200>
  /**
   * RequestController_editTypeRequest - редактирование типа заявки
   * 
   * необходима роль администратора
   */
  'RequestController_editTypeRequest'(
    parameters?: Parameters<Paths.RequestControllerEditTypeRequest.PathParameters & Paths.RequestControllerEditTypeRequest.HeaderParameters> | null,
    data?: Paths.RequestControllerEditTypeRequest.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RequestControllerEditTypeRequest.Responses.$200>
  /**
   * RequestController_deleteTypeRequestById - удаление типа заявки
   * 
   * необходима роль администратора
   */
  'RequestController_deleteTypeRequestById'(
    parameters?: Parameters<Paths.RequestControllerDeleteTypeRequestById.PathParameters & Paths.RequestControllerDeleteTypeRequestById.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RequestControllerDeleteTypeRequestById.Responses.$200>
  /**
   * RequestController_getRequestStatuses - получение существующих статусов для заявок
   */
  'RequestController_getRequestStatuses'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RequestControllerGetRequestStatuses.Responses.$200>
  /**
   * AddStoryRequestController_getAddStoryRequestAll - получение всех заявок на добавление сказки
   * 
   * необходима роль администратора. пример запроса: /api/add-story-request/all?start=1&count=10
   */
  'AddStoryRequestController_getAddStoryRequestAll'(
    parameters?: Parameters<Paths.AddStoryRequestControllerGetAddStoryRequestAll.QueryParameters & Paths.AddStoryRequestControllerGetAddStoryRequestAll.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddStoryRequestControllerGetAddStoryRequestAll.Responses.$200>
  /**
   * AddStoryRequestController_getAddStoryRequestForCurrentUser - получение всех заявок на добавление сказки от текущего пользователя
   */
  'AddStoryRequestController_getAddStoryRequestForCurrentUser'(
    parameters?: Parameters<Paths.AddStoryRequestControllerGetAddStoryRequestForCurrentUser.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddStoryRequestControllerGetAddStoryRequestForCurrentUser.Responses.$200>
  /**
   * AddStoryRequestController_getAddStoryRequestByUserId - получение всех заявок на добавление сказки для выбранного пользователя
   * 
   * необходима роль администратора.
   */
  'AddStoryRequestController_getAddStoryRequestByUserId'(
    parameters?: Parameters<Paths.AddStoryRequestControllerGetAddStoryRequestByUserId.PathParameters & Paths.AddStoryRequestControllerGetAddStoryRequestByUserId.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddStoryRequestControllerGetAddStoryRequestByUserId.Responses.$200>
  /**
   * AddStoryRequestController_createAddStoryRequestForCurrentUser - создание заявки на добавление сказки
   */
  'AddStoryRequestController_createAddStoryRequestForCurrentUser'(
    parameters?: Parameters<Paths.AddStoryRequestControllerCreateAddStoryRequestForCurrentUser.HeaderParameters> | null,
    data?: Paths.AddStoryRequestControllerCreateAddStoryRequestForCurrentUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddStoryRequestControllerCreateAddStoryRequestForCurrentUser.Responses.$200>
  /**
   * AddStoryRequestController_editStatusAddStoryReqeust - обновление заявки
   * 
   * необходима роль администратора. статус заявки берется из /api/request/status/all | Необходима роль moder | После успешного редактирования данные заявки так же передаются пользователю с userId по веб-сокету
   */
  'AddStoryRequestController_editStatusAddStoryReqeust'(
    parameters?: Parameters<Paths.AddStoryRequestControllerEditStatusAddStoryReqeust.PathParameters & Paths.AddStoryRequestControllerEditStatusAddStoryReqeust.HeaderParameters> | null,
    data?: Paths.AddStoryRequestControllerEditStatusAddStoryReqeust.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddStoryRequestControllerEditStatusAddStoryReqeust.Responses.$200>
  /**
   * AddStoryRequestController_deleteAddStoryRequestById - удаление заявки
   * 
   * Необходима роль администратора
   */
  'AddStoryRequestController_deleteAddStoryRequestById'(
    parameters?: Parameters<Paths.AddStoryRequestControllerDeleteAddStoryRequestById.PathParameters & Paths.AddStoryRequestControllerDeleteAddStoryRequestById.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddStoryRequestControllerDeleteAddStoryRequestById.Responses.$200>
}

export interface PathsDictionary {
  ['/api/auth/signup']: {
    /**
     * AuthController_signUp - регистрация
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AuthControllerSignUp.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthControllerSignUp.Responses.$201>
  }
  ['/api/auth/signin']: {
    /**
     * AuthController_signIn - вход
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AuthControllerSignIn.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthControllerSignIn.Responses.$200>
  }
  ['/api/auth/refresh']: {
    /**
     * AuthController_refresh -  на обновление access token
     */
    'post'(
      parameters?: Parameters<Paths.AuthControllerRefresh.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthControllerRefresh.Responses.$200>
  }
  ['/api/auth/logout']: {
    /**
     * AuthController_logout - выход из системы
     */
    'post'(
      parameters?: Parameters<Paths.AuthControllerLogout.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthControllerLogout.Responses.$200>
  }
  ['/api/user/me']: {
    /**
     * UserController_getCurrentUserInfo - получение информации о текущем пользователе
     */
    'get'(
      parameters?: Parameters<Paths.UserControllerGetCurrentUserInfo.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserControllerGetCurrentUserInfo.Responses.$200>
  }
  ['/api/user/{userId}']: {
    /**
     * UserController_findUserById - получение информации о пользователе по его id
     * 
     * необходима роль администратора
     */
    'get'(
      parameters?: Parameters<Paths.UserControllerFindUserById.PathParameters & Paths.UserControllerFindUserById.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserControllerFindUserById.Responses.$200>
  }
  ['/api/user/delete/{userId}']: {
    /**
     * UserController_deleteUser - удаленеи пользователя по его id
     * 
     * необходима роль администратора
     */
    'delete'(
      parameters?: Parameters<Paths.UserControllerDeleteUser.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserControllerDeleteUser.Responses.$200>
  }
  ['/api/constituent/add']: {
    /**
     * ConstituentsController_addConstituent - добавление субъекта РФ
     * 
     * необходима роль администратора
     */
    'post'(
      parameters?: Parameters<Paths.ConstituentsControllerAddConstituent.HeaderParameters> | null,
      data?: Paths.ConstituentsControllerAddConstituent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ConstituentsControllerAddConstituent.Responses.$200>
  }
  ['/api/constituent/add/ethnic-group']: {
    /**
     * ConstituentsController_addEthnicGroupToConstituent - добавление этнической группы к субъекту рф
     * 
     * небходима роль администратора
     */
    'post'(
      parameters?: Parameters<Paths.ConstituentsControllerAddEthnicGroupToConstituent.HeaderParameters> | null,
      data?: Paths.ConstituentsControllerAddEthnicGroupToConstituent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ConstituentsControllerAddEthnicGroupToConstituent.Responses.$200>
  }
  ['/api/constituent/ethnic-group/delete']: {
    /**
     * ConstituentsController_deleteEthnicGroupFromConstituent - удаление этнической группы у субъекта рф
     * 
     * необходима роль администратора
     */
    'delete'(
      parameters?: Parameters<Paths.ConstituentsControllerDeleteEthnicGroupFromConstituent.HeaderParameters> | null,
      data?: Paths.ConstituentsControllerDeleteEthnicGroupFromConstituent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ConstituentsControllerDeleteEthnicGroupFromConstituent.Responses.$200>
  }
  ['/api/constituent/ethnic-group/{constituentId}']: {
    /**
     * ConstituentsController_getEthnicGroupByConstituentId - получение этнической группы, принадлежащей субъекту рф
     */
    'get'(
      parameters?: Parameters<Paths.ConstituentsControllerGetEthnicGroupByConstituentId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ConstituentsControllerGetEthnicGroupByConstituentId.Responses.$200>
  }
  ['/api/constituent/all']: {
    /**
     * ConstituentsController_getConstituents - получение всех субъектов
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ConstituentsControllerGetConstituents.Responses.$200>
  }
  ['/api/constituent/edit/{id}']: {
    /**
     * ConstituentsController_editConstituent - редактирование субъекта
     * 
     * небходима роль администратора
     */
    'put'(
      parameters?: Parameters<Paths.ConstituentsControllerEditConstituent.HeaderParameters> | null,
      data?: Paths.ConstituentsControllerEditConstituent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ConstituentsControllerEditConstituent.Responses.$200>
  }
  ['/api/constituent/{id}']: {
    /**
     * ConstituentsController_deleteConstituentById - удаление данных субъекта
     * 
     * необходима роль администратора
     */
    'delete'(
      parameters?: Parameters<Paths.ConstituentsControllerDeleteConstituentById.PathParameters & Paths.ConstituentsControllerDeleteConstituentById.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ConstituentsControllerDeleteConstituentById.Responses.$200>
  }
  ['/api/ethnic-group/add']: {
    /**
     * EthnicGroupController_addEthnicGroup - добавление этнической группы
     * 
     * необходима роль администратора
     */
    'post'(
      parameters?: Parameters<Paths.EthnicGroupControllerAddEthnicGroup.HeaderParameters> | null,
      data?: Paths.EthnicGroupControllerAddEthnicGroup.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.EthnicGroupControllerAddEthnicGroup.Responses.$200>
  }
  ['/api/ethnic-group/all']: {
    /**
     * EthnicGroupController_ethnicGroups - получение списка этнических групп
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.EthnicGroupControllerEthnicGroups.Responses.$200>
  }
  ['/api/ethnic-group/{ethnicGroupId}']: {
    /**
     * EthnicGroupController_getEthnicGroupById - получение этнической группы по ethnicGroupId
     */
    'get'(
      parameters?: Parameters<Paths.EthnicGroupControllerGetEthnicGroupById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.EthnicGroupControllerGetEthnicGroupById.Responses.$200>
  }
  ['/api/ethnic-group/edit/{id}']: {
    /**
     * EthnicGroupController_editEthnicGroup - редактирование этнической группы
     * 
     * необходима роль администратора
     */
    'put'(
      parameters?: Parameters<Paths.EthnicGroupControllerEditEthnicGroup.PathParameters & Paths.EthnicGroupControllerEditEthnicGroup.HeaderParameters> | null,
      data?: Paths.EthnicGroupControllerEditEthnicGroup.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.EthnicGroupControllerEditEthnicGroup.Responses.$200>
  }
  ['/api/ethnic-group/{id}']: {
    /**
     * EthnicGroupController_deleteEthnicGroup - удаление этнической группы
     * 
     * необходима роль администратора
     */
    'delete'(
      parameters?: Parameters<Paths.EthnicGroupControllerDeleteEthnicGroup.PathParameters & Paths.EthnicGroupControllerDeleteEthnicGroup.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.EthnicGroupControllerDeleteEthnicGroup.Responses.$200>
  }
  ['/api/ethnic-group/language/add']: {
    /**
     * EthnicGroupController_addLanguage - добавление языка этнической группы
     * 
     * необходима роль администратора
     */
    'post'(
      parameters?: Parameters<Paths.EthnicGroupControllerAddLanguage.HeaderParameters> | null,
      data?: Paths.EthnicGroupControllerAddLanguage.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.EthnicGroupControllerAddLanguage.Responses.$200>
  }
  ['/api/ethnic-group/language/all']: {
    /**
     * EthnicGroupController_getAllLanguage - получение списка всех языков
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.EthnicGroupControllerGetAllLanguage.Responses.$200>
  }
  ['/api/ethnic-group/language/{id}']: {
    /**
     * EthnicGroupController_deleteLanguageById - удаление языка по id
     * 
     * необходима роль администратора
     */
    'delete'(
      parameters?: Parameters<Paths.EthnicGroupControllerDeleteLanguageById.PathParameters & Paths.EthnicGroupControllerDeleteLanguageById.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.EthnicGroupControllerDeleteLanguageById.Responses.$200>
  }
  ['/api/map/map.json']: {
    /**
     * MapController_getMapTopojson - получить данные для отрисовки карты
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.MapControllerGetMapTopojson.Responses.$200>
  }
  ['/api/map/ethnic-groups']: {
    /**
     * MapController_getEthnicalGroupPoints - получение точек этнических групп на карте
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.MapControllerGetEthnicalGroupPoints.Responses.$200>
  }
  ['/api/map/ethnic-groups/{constituentId}']: {
    /**
     * MapController_getEthnicalGroupPointsByConstituentId - получение точек этнических групп по номеру региона
     */
    'get'(
      parameters?: Parameters<Paths.MapControllerGetEthnicalGroupPointsByConstituentId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.MapControllerGetEthnicalGroupPointsByConstituentId.Responses.$200>
  }
  ['/api/map/ethnic-groups/{name}']: {
    /**
     * MapController_getEthnicGroupPointsByName - получение точек этнических групп по названию этнической группы
     */
    'get'(
      parameters?: Parameters<Paths.MapControllerGetEthnicGroupPointsByName.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.MapControllerGetEthnicGroupPointsByName.Responses.$200>
  }
  ['/api/map/ethnic-groups/{pointId}']: {
    /**
     * MapController_deleteEthnicalGroupPoint - удаление точки этнической группы
     * 
     * необходима роль администратора
     */
    'delete'(
      parameters?: Parameters<Paths.MapControllerDeleteEthnicalGroupPoint.PathParameters & Paths.MapControllerDeleteEthnicalGroupPoint.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.MapControllerDeleteEthnicalGroupPoint.Responses.$200>
  }
  ['/api/map/constituents/filled']: {
    /**
     * MapController_getPercentsFilledStoriesByConstituentId - получение списка субъектов и их заполненности озвучками
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.MapControllerGetPercentsFilledStoriesByConstituentId.Responses.$200>
  }
  ['/api/admin/ethnic-groups/{ethnicGroupId}/constituents/{constituentId}']: {
    /**
     * AdminController_addEthnicalGroupPoint - добавление точки этнической группы на карту
     * 
     * необходима роль администратора
     */
    'post'(
      parameters?: Parameters<Paths.AdminControllerAddEthnicalGroupPoint.PathParameters & Paths.AdminControllerAddEthnicalGroupPoint.HeaderParameters> | null,
      data?: Paths.AdminControllerAddEthnicalGroupPoint.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AdminControllerAddEthnicalGroupPoint.Responses.$200>
  }
  ['/api/admin/ethnic-groups/{pointId}']: {
    /**
     * AdminController_deleteEthnicalGroupPoint - удаление точки этнической группы
     * 
     * необходима роль администратора
     */
    'delete'(
      parameters?: Parameters<Paths.AdminControllerDeleteEthnicalGroupPoint.PathParameters & Paths.AdminControllerDeleteEthnicalGroupPoint.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AdminControllerDeleteEthnicalGroupPoint.Responses.$200>
  }
  ['/api/admin/story/add']: {
    /**
     * AdminController_addStory - добавление сказки
     */
    'post'(
      parameters?: Parameters<Paths.AdminControllerAddStory.HeaderParameters> | null,
      data?: Paths.AdminControllerAddStory.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AdminControllerAddStory.Responses.$200>
  }
  ['/api/admin/story/edit/{storyId}']: {
    /**
     * AdminController_editSotry - редактирование сказки
     */
    'put'(
      parameters?: Parameters<Paths.AdminControllerEditSotry.PathParameters & Paths.AdminControllerEditSotry.HeaderParameters> | null,
      data?: Paths.AdminControllerEditSotry.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AdminControllerEditSotry.Responses.$200>
  }
  ['/api/admin/story/delete/{storyId}']: {
    /**
     * AdminController_deleteStoryById - удаление сказки
     */
    'delete'(
      parameters?: Parameters<Paths.AdminControllerDeleteStoryById.PathParameters & Paths.AdminControllerDeleteStoryById.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AdminControllerDeleteStoryById.Responses.$200>
  }
  ['/api/admin/story/text/add/{storyId}']: {
    /**
     * AdminController_addTextStory - добавление текста сказки
     */
    'post'(
      parameters?: Parameters<Paths.AdminControllerAddTextStory.HeaderParameters> | null,
      data?: Paths.AdminControllerAddTextStory.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AdminControllerAddTextStory.Responses.$200>
  }
  ['/api/story/all']: {
    /**
     * StoryController_getAllStories - получение всех сказок
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StoryControllerGetAllStories.Responses.$200>
  }
  ['/api/story/by-name/{name}']: {
    /**
     * StoryController_getStoryByName - получение сказок в которых есть подстрока name
     */
    'get'(
      parameters?: Parameters<Paths.StoryControllerGetStoryByName.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StoryControllerGetStoryByName.Responses.$200>
  }
  ['/api/story/{storyId}']: {
    /**
     * StoryController_getStoryById - получение общей информации о выбранной сказке
     */
    'get'(
      parameters?: Parameters<Paths.StoryControllerGetStoryById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StoryControllerGetStoryById.Responses.$200>
  }
  ['/api/story/languages/{storyId}']: {
    /**
     * StoryController_getLanguagesForCurrentStory - получение доступных языков озвучки для выбранной сказки
     */
    'get'(
      parameters?: Parameters<Paths.StoryControllerGetLanguagesForCurrentStory.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StoryControllerGetLanguagesForCurrentStory.Responses.$200>
  }
  ['/api/story/ethnic-group/{ethnicGroupId}']: {
    /**
     * StoryController_getStoriesByEthnicGroupId - получение всех сказок выбранной этнической группы
     */
    'get'(
      parameters?: Parameters<Paths.StoryControllerGetStoriesByEthnicGroupId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StoryControllerGetStoriesByEthnicGroupId.Responses.$200>
  }
  ['/api/story/text/{storyId}']: {
    /**
     * StoryController_getTextStoryByStoryId - получение текста сказки
     */
    'get'(
      parameters?: Parameters<Paths.StoryControllerGetTextStoryByStoryId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StoryControllerGetTextStoryByStoryId.Responses.$200>
  }
  ['/api/story/audio/{audioId}']: {
    /**
     * StoryController_getAudioStoryById - получение одобренной озвучки по audioId
     * 
     * возвращает StreamableFile
     */
    'get'(
      parameters?: Parameters<Paths.StoryControllerGetAudioStoryById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StoryControllerGetAudioStoryById.Responses.$200>
  }
  ['/api/story/audio']: {
    /**
     * StoryController_setUserAudioToStory - добавление озвучки к сказке
     * 
     * пример запроса: /api/story/audio?storyId=8 | необходима роль администратора
     */
    'put'(
      parameters?: Parameters<Paths.StoryControllerSetUserAudioToStory.QueryParameters & Paths.StoryControllerSetUserAudioToStory.HeaderParameters> | null,
      data?: Paths.StoryControllerSetUserAudioToStory.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StoryControllerSetUserAudioToStory.Responses.$200>
  }
  ['/api/story/image/{storyId}']: {
    /**
     * StoryController_getImgStoryById - получение обложки для сказки по storyId
     */
    'get'(
      parameters?: Parameters<Paths.StoryControllerGetImgStoryById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StoryControllerGetImgStoryById.Responses.$200>
  }
  ['/api/story/image/upload/{storyId}']: {
    /**
     * StoryController_uploadStoryImage - загрузка обложки для выбранной сказки
     * 
     * необходима роль администратора
     */
    'put'(
      parameters?: Parameters<Paths.StoryControllerUploadStoryImage.PathParameters & Paths.StoryControllerUploadStoryImage.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StoryControllerUploadStoryImage.Responses.$200>
  }
  ['/api/story/image/delete/{storyId}']: {
    /**
     * StoryController_deleteStoryImgByStoryId - удаление обложки для выбранной сказки по storyId
     * 
     * необходима роль администратора
     */
    'delete'(
      parameters?: Parameters<Paths.StoryControllerDeleteStoryImgByStoryId.PathParameters & Paths.StoryControllerDeleteStoryImgByStoryId.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StoryControllerDeleteStoryImgByStoryId.Responses.$200>
  }
  ['/api/story/rating/{audioId}']: {
    /**
     * StoryController_getRatingByAudioId - получение оценки для выбранной озвучки
     */
    'get'(
      parameters?: Parameters<Paths.StoryControllerGetRatingByAudioId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StoryControllerGetRatingByAudioId.Responses.$200>
  }
  ['/api/story/rating/my/{userAudioId}']: {
    /**
     * StoryController_getRatingByAudioIdForCurrentUser - получение оценки для выбранной озвучки для текущего пользователя
     */
    'get'(
      parameters?: Parameters<Paths.StoryControllerGetRatingByAudioIdForCurrentUser.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StoryControllerGetRatingByAudioIdForCurrentUser.Responses.$200>
  }
  ['/api/story/rating/add']: {
    /**
     * StoryController_addRatingForStoryByCurrentUser - добавление текущим пользователем оценки к озвучке по audioId
     */
    'put'(
      parameters?: Parameters<Paths.StoryControllerAddRatingForStoryByCurrentUser.HeaderParameters> | null,
      data?: Paths.StoryControllerAddRatingForStoryByCurrentUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StoryControllerAddRatingForStoryByCurrentUser.Responses.$200>
  }
  ['/api/user-audio/my-audios']: {
    /**
     * UserAudioController_getCurrentUserAudios - получение озвучек текущего пользователя
     */
    'get'(
      parameters?: Parameters<Paths.UserAudioControllerGetCurrentUserAudios.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserAudioControllerGetCurrentUserAudios.Responses.$200>
  }
  ['/api/user-audio/my-audios/approved']: {
    /**
     * UserAudioController_getApprovedUserAudiosCurrentUser - получение одобренных озвучек текущего пользователя
     */
    'get'(
      parameters?: Parameters<Paths.UserAudioControllerGetApprovedUserAudiosCurrentUser.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserAudioControllerGetApprovedUserAudiosCurrentUser.Responses.$200>
  }
  ['/api/user-audio/{userAudioId}']: {
    /**
     * UserAudioController_getUserAudioById - получение файла озвучки пользователя
     */
    'get'(
      parameters?: Parameters<Paths.UserAudioControllerGetUserAudioById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserAudioControllerGetUserAudioById.Responses.$200>
  }
  ['/api/user-audio/upload/{languageId}']: {
    /**
     * UserAudioController_uploadUserAudio - загрузка озвучки пользователя для выбранного языка
     * 
     * в теле запроса(body) файл прикрепляется к полю file
     */
    'put'(
      parameters?: Parameters<Paths.UserAudioControllerUploadUserAudio.PathParameters & Paths.UserAudioControllerUploadUserAudio.HeaderParameters> | null,
      data?: Paths.UserAudioControllerUploadUserAudio.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserAudioControllerUploadUserAudio.Responses.$200>
  }
  ['/api/user-audio/delete/{userAudioId}']: {
    /**
     * UserAudioController_deleteUserAudioById - удаление озвучки пользователя
     * 
     * необходима роль администратора
     */
    'delete'(
      parameters?: Parameters<Paths.UserAudioControllerDeleteUserAudioById.PathParameters & Paths.UserAudioControllerDeleteUserAudioById.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserAudioControllerDeleteUserAudioById.Responses.$200>
  }
  ['/api/audio-story-request/my-requests']: {
    /**
     * AudioStoryRequestController_getAllAudioStoryRequestsCurrentUser - получение всех заявок на озвучки текущего пользователя
     */
    'get'(
      parameters?: Parameters<Paths.AudioStoryRequestControllerGetAllAudioStoryRequestsCurrentUser.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AudioStoryRequestControllerGetAllAudioStoryRequestsCurrentUser.Responses.$200>
  }
  ['/api/audio-story-request/all']: {
    /**
     * AudioStoryRequestController_getAllAudioStoryRequests - получение всех заявок на озвучки
     * 
     * необходимы роль модератора
     */
    'get'(
      parameters?: Parameters<Paths.AudioStoryRequestControllerGetAllAudioStoryRequests.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AudioStoryRequestControllerGetAllAudioStoryRequests.Responses.$200>
  }
  ['/api/audio-story-request/by-user/{userId}']: {
    /**
     * AudioStoryRequestController_getAllAudioStoryReqeustsByUserId - получение всех заявок на озвучки для выбранного пользователя.
     * 
     * Необходима роль модератора
     */
    'get'(
      parameters?: Parameters<Paths.AudioStoryRequestControllerGetAllAudioStoryReqeustsByUserId.PathParameters & Paths.AudioStoryRequestControllerGetAllAudioStoryReqeustsByUserId.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AudioStoryRequestControllerGetAllAudioStoryReqeustsByUserId.Responses.$200>
  }
  ['/api/audio-story-request/add']: {
    /**
     * AudioStoryRequestController_createAddAudioRequest - Создание заявки на проверку озвучки
     */
    'post'(
      parameters?: Parameters<Paths.AudioStoryRequestControllerCreateAddAudioRequest.HeaderParameters> | null,
      data?: Paths.AudioStoryRequestControllerCreateAddAudioRequest.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AudioStoryRequestControllerCreateAddAudioRequest.Responses.$200>
  }
  ['/api/audio-story-request/edit/{audioStoryReqeustId}']: {
    /**
     * AudioStoryRequestController_editAudioStoryRequest - редактирование заявки на проверку озвучки
     * 
     * необходима роль модератора. после редактирования, отредактированная запись по вебсокету отправляется пользователю из userId(создавшему заявку) в событие с названием "statuses"
     */
    'put'(
      parameters?: Parameters<Paths.AudioStoryRequestControllerEditAudioStoryRequest.PathParameters & Paths.AudioStoryRequestControllerEditAudioStoryRequest.HeaderParameters> | null,
      data?: Paths.AudioStoryRequestControllerEditAudioStoryRequest.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AudioStoryRequestControllerEditAudioStoryRequest.Responses.$200>
  }
  ['/api/audio-story-request/delete/{audioStoryRequestId}']: {
    /**
     * AudioStoryRequestController_deleteAudioStoryRequestBydId - удаление заявки на проверку озвучки
     * 
     * необходима роль администратора
     */
    'delete'(
      parameters?: Parameters<Paths.AudioStoryRequestControllerDeleteAudioStoryRequestBydId.PathParameters & Paths.AudioStoryRequestControllerDeleteAudioStoryRequestBydId.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AudioStoryRequestControllerDeleteAudioStoryRequestBydId.Responses.$200>
  }
  ['/api/request/type/all']: {
    /**
     * RequestController_getAllRequestTypes - получение списка всех типов заявок
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RequestControllerGetAllRequestTypes.Responses.$200>
  }
  ['/api/request/type/{typeRequestId}']: {
    /**
     * RequestController_getTypeRequestById - получение типа заявки по id
     */
    'get'(
      parameters?: Parameters<Paths.RequestControllerGetTypeRequestById.PathParameters & Paths.RequestControllerGetTypeRequestById.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RequestControllerGetTypeRequestById.Responses.$200>
  }
  ['/api/request/type/add']: {
    /**
     * RequestController_addTypeRequest - добавление типа заявки
     * 
     * необходима роль администратора
     */
    'post'(
      parameters?: Parameters<Paths.RequestControllerAddTypeRequest.HeaderParameters> | null,
      data?: Paths.RequestControllerAddTypeRequest.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RequestControllerAddTypeRequest.Responses.$200>
  }
  ['/api/request/type/edit/{typeRequestId}']: {
    /**
     * RequestController_editTypeRequest - редактирование типа заявки
     * 
     * необходима роль администратора
     */
    'put'(
      parameters?: Parameters<Paths.RequestControllerEditTypeRequest.PathParameters & Paths.RequestControllerEditTypeRequest.HeaderParameters> | null,
      data?: Paths.RequestControllerEditTypeRequest.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RequestControllerEditTypeRequest.Responses.$200>
  }
  ['/api/request/type/delete/{typeRequestId}']: {
    /**
     * RequestController_deleteTypeRequestById - удаление типа заявки
     * 
     * необходима роль администратора
     */
    'delete'(
      parameters?: Parameters<Paths.RequestControllerDeleteTypeRequestById.PathParameters & Paths.RequestControllerDeleteTypeRequestById.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RequestControllerDeleteTypeRequestById.Responses.$200>
  }
  ['/api/request/status/all']: {
    /**
     * RequestController_getRequestStatuses - получение существующих статусов для заявок
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RequestControllerGetRequestStatuses.Responses.$200>
  }
  ['/api/add-story-request/all']: {
    /**
     * AddStoryRequestController_getAddStoryRequestAll - получение всех заявок на добавление сказки
     * 
     * необходима роль администратора. пример запроса: /api/add-story-request/all?start=1&count=10
     */
    'get'(
      parameters?: Parameters<Paths.AddStoryRequestControllerGetAddStoryRequestAll.QueryParameters & Paths.AddStoryRequestControllerGetAddStoryRequestAll.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddStoryRequestControllerGetAddStoryRequestAll.Responses.$200>
  }
  ['/api/add-story-request/my-requests']: {
    /**
     * AddStoryRequestController_getAddStoryRequestForCurrentUser - получение всех заявок на добавление сказки от текущего пользователя
     */
    'get'(
      parameters?: Parameters<Paths.AddStoryRequestControllerGetAddStoryRequestForCurrentUser.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddStoryRequestControllerGetAddStoryRequestForCurrentUser.Responses.$200>
  }
  ['/api/add-story-request/by-user/{userId}']: {
    /**
     * AddStoryRequestController_getAddStoryRequestByUserId - получение всех заявок на добавление сказки для выбранного пользователя
     * 
     * необходима роль администратора.
     */
    'get'(
      parameters?: Parameters<Paths.AddStoryRequestControllerGetAddStoryRequestByUserId.PathParameters & Paths.AddStoryRequestControllerGetAddStoryRequestByUserId.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddStoryRequestControllerGetAddStoryRequestByUserId.Responses.$200>
  }
  ['/api/add-story-request/create']: {
    /**
     * AddStoryRequestController_createAddStoryRequestForCurrentUser - создание заявки на добавление сказки
     */
    'post'(
      parameters?: Parameters<Paths.AddStoryRequestControllerCreateAddStoryRequestForCurrentUser.HeaderParameters> | null,
      data?: Paths.AddStoryRequestControllerCreateAddStoryRequestForCurrentUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddStoryRequestControllerCreateAddStoryRequestForCurrentUser.Responses.$200>
  }
  ['/api/add-story-request/edit/{addStoryRequestId}']: {
    /**
     * AddStoryRequestController_editStatusAddStoryReqeust - обновление заявки
     * 
     * необходима роль администратора. статус заявки берется из /api/request/status/all | Необходима роль moder | После успешного редактирования данные заявки так же передаются пользователю с userId по веб-сокету
     */
    'put'(
      parameters?: Parameters<Paths.AddStoryRequestControllerEditStatusAddStoryReqeust.PathParameters & Paths.AddStoryRequestControllerEditStatusAddStoryReqeust.HeaderParameters> | null,
      data?: Paths.AddStoryRequestControllerEditStatusAddStoryReqeust.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddStoryRequestControllerEditStatusAddStoryReqeust.Responses.$200>
  }
  ['/api/add-story-request/delete/{addStoryRequestId}']: {
    /**
     * AddStoryRequestController_deleteAddStoryRequestById - удаление заявки
     * 
     * Необходима роль администратора
     */
    'delete'(
      parameters?: Parameters<Paths.AddStoryRequestControllerDeleteAddStoryRequestById.PathParameters & Paths.AddStoryRequestControllerDeleteAddStoryRequestById.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddStoryRequestControllerDeleteAddStoryRequestById.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>

// Copied from the standard library and renamed to FunctionParameters
// because the name Parameters clashes with openapi-client-axios.
/**
 * Obtain the parameters of a function type in a tuple
 */
type FunctionParameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

const api = new OpenAPIClientAxios({ definition: definition as Document });

export const clientPromise = api.init<Client>();

export async function authControllerSignUpRaw(...args: FunctionParameters<OperationMethods['AuthController_signUp']>) {
  const client = await clientPromise;
  return await client['AuthController_signUp'](...args);
}

export async function authControllerSignInRaw(...args: FunctionParameters<OperationMethods['AuthController_signIn']>) {
  const client = await clientPromise;
  return await client['AuthController_signIn'](...args);
}

export async function authControllerRefreshRaw(...args: FunctionParameters<OperationMethods['AuthController_refresh']>) {
  const client = await clientPromise;
  return await client['AuthController_refresh'](...args);
}

export async function authControllerLogoutRaw(...args: FunctionParameters<OperationMethods['AuthController_logout']>) {
  const client = await clientPromise;
  return await client['AuthController_logout'](...args);
}

export async function userControllerGetCurrentUserInfoRaw(...args: FunctionParameters<OperationMethods['UserController_getCurrentUserInfo']>) {
  const client = await clientPromise;
  return await client['UserController_getCurrentUserInfo'](...args);
}

export async function userControllerFindUserByIdRaw(...args: FunctionParameters<OperationMethods['UserController_findUserById']>) {
  const client = await clientPromise;
  return await client['UserController_findUserById'](...args);
}

export async function userControllerDeleteUserRaw(...args: FunctionParameters<OperationMethods['UserController_deleteUser']>) {
  const client = await clientPromise;
  return await client['UserController_deleteUser'](...args);
}

export async function constituentsControllerAddConstituentRaw(...args: FunctionParameters<OperationMethods['ConstituentsController_addConstituent']>) {
  const client = await clientPromise;
  return await client['ConstituentsController_addConstituent'](...args);
}

export async function constituentsControllerAddEthnicGroupToConstituentRaw(...args: FunctionParameters<OperationMethods['ConstituentsController_addEthnicGroupToConstituent']>) {
  const client = await clientPromise;
  return await client['ConstituentsController_addEthnicGroupToConstituent'](...args);
}

export async function constituentsControllerDeleteEthnicGroupFromConstituentRaw(...args: FunctionParameters<OperationMethods['ConstituentsController_deleteEthnicGroupFromConstituent']>) {
  const client = await clientPromise;
  return await client['ConstituentsController_deleteEthnicGroupFromConstituent'](...args);
}

export async function constituentsControllerGetEthnicGroupByConstituentIdRaw(...args: FunctionParameters<OperationMethods['ConstituentsController_getEthnicGroupByConstituentId']>) {
  const client = await clientPromise;
  return await client['ConstituentsController_getEthnicGroupByConstituentId'](...args);
}

export async function constituentsControllerGetConstituentsRaw(...args: FunctionParameters<OperationMethods['ConstituentsController_getConstituents']>) {
  const client = await clientPromise;
  return await client['ConstituentsController_getConstituents'](...args);
}

export async function constituentsControllerEditConstituentRaw(...args: FunctionParameters<OperationMethods['ConstituentsController_editConstituent']>) {
  const client = await clientPromise;
  return await client['ConstituentsController_editConstituent'](...args);
}

export async function constituentsControllerDeleteConstituentByIdRaw(...args: FunctionParameters<OperationMethods['ConstituentsController_deleteConstituentById']>) {
  const client = await clientPromise;
  return await client['ConstituentsController_deleteConstituentById'](...args);
}

export async function ethnicGroupControllerAddEthnicGroupRaw(...args: FunctionParameters<OperationMethods['EthnicGroupController_addEthnicGroup']>) {
  const client = await clientPromise;
  return await client['EthnicGroupController_addEthnicGroup'](...args);
}

export async function ethnicGroupControllerEthnicGroupsRaw(...args: FunctionParameters<OperationMethods['EthnicGroupController_ethnicGroups']>) {
  const client = await clientPromise;
  return await client['EthnicGroupController_ethnicGroups'](...args);
}

export async function ethnicGroupControllerGetEthnicGroupByIdRaw(...args: FunctionParameters<OperationMethods['EthnicGroupController_getEthnicGroupById']>) {
  const client = await clientPromise;
  return await client['EthnicGroupController_getEthnicGroupById'](...args);
}

export async function ethnicGroupControllerEditEthnicGroupRaw(...args: FunctionParameters<OperationMethods['EthnicGroupController_editEthnicGroup']>) {
  const client = await clientPromise;
  return await client['EthnicGroupController_editEthnicGroup'](...args);
}

export async function ethnicGroupControllerDeleteEthnicGroupRaw(...args: FunctionParameters<OperationMethods['EthnicGroupController_deleteEthnicGroup']>) {
  const client = await clientPromise;
  return await client['EthnicGroupController_deleteEthnicGroup'](...args);
}

export async function ethnicGroupControllerAddLanguageRaw(...args: FunctionParameters<OperationMethods['EthnicGroupController_addLanguage']>) {
  const client = await clientPromise;
  return await client['EthnicGroupController_addLanguage'](...args);
}

export async function ethnicGroupControllerGetAllLanguageRaw(...args: FunctionParameters<OperationMethods['EthnicGroupController_getAllLanguage']>) {
  const client = await clientPromise;
  return await client['EthnicGroupController_getAllLanguage'](...args);
}

export async function ethnicGroupControllerDeleteLanguageByIdRaw(...args: FunctionParameters<OperationMethods['EthnicGroupController_deleteLanguageById']>) {
  const client = await clientPromise;
  return await client['EthnicGroupController_deleteLanguageById'](...args);
}

export async function mapControllerGetMapTopojsonRaw(...args: FunctionParameters<OperationMethods['MapController_getMapTopojson']>) {
  const client = await clientPromise;
  return await client['MapController_getMapTopojson'](...args);
}

export async function mapControllerGetEthnicalGroupPointsRaw(...args: FunctionParameters<OperationMethods['MapController_getEthnicalGroupPoints']>) {
  const client = await clientPromise;
  return await client['MapController_getEthnicalGroupPoints'](...args);
}

export async function mapControllerGetEthnicalGroupPointsByConstituentIdRaw(...args: FunctionParameters<OperationMethods['MapController_getEthnicalGroupPointsByConstituentId']>) {
  const client = await clientPromise;
  return await client['MapController_getEthnicalGroupPointsByConstituentId'](...args);
}

export async function mapControllerGetEthnicGroupPointsByNameRaw(...args: FunctionParameters<OperationMethods['MapController_getEthnicGroupPointsByName']>) {
  const client = await clientPromise;
  return await client['MapController_getEthnicGroupPointsByName'](...args);
}

export async function mapControllerDeleteEthnicalGroupPointRaw(...args: FunctionParameters<OperationMethods['MapController_deleteEthnicalGroupPoint']>) {
  const client = await clientPromise;
  return await client['MapController_deleteEthnicalGroupPoint'](...args);
}

export async function mapControllerGetPercentsFilledStoriesByConstituentIdRaw(...args: FunctionParameters<OperationMethods['MapController_getPercentsFilledStoriesByConstituentId']>) {
  const client = await clientPromise;
  return await client['MapController_getPercentsFilledStoriesByConstituentId'](...args);
}

export async function adminControllerAddEthnicalGroupPointRaw(...args: FunctionParameters<OperationMethods['AdminController_addEthnicalGroupPoint']>) {
  const client = await clientPromise;
  return await client['AdminController_addEthnicalGroupPoint'](...args);
}

export async function adminControllerDeleteEthnicalGroupPointRaw(...args: FunctionParameters<OperationMethods['AdminController_deleteEthnicalGroupPoint']>) {
  const client = await clientPromise;
  return await client['AdminController_deleteEthnicalGroupPoint'](...args);
}

export async function adminControllerAddStoryRaw(...args: FunctionParameters<OperationMethods['AdminController_addStory']>) {
  const client = await clientPromise;
  return await client['AdminController_addStory'](...args);
}

export async function adminControllerEditSotryRaw(...args: FunctionParameters<OperationMethods['AdminController_editSotry']>) {
  const client = await clientPromise;
  return await client['AdminController_editSotry'](...args);
}

export async function adminControllerDeleteStoryByIdRaw(...args: FunctionParameters<OperationMethods['AdminController_deleteStoryById']>) {
  const client = await clientPromise;
  return await client['AdminController_deleteStoryById'](...args);
}

export async function adminControllerAddTextStoryRaw(...args: FunctionParameters<OperationMethods['AdminController_addTextStory']>) {
  const client = await clientPromise;
  return await client['AdminController_addTextStory'](...args);
}

export async function storyControllerGetAllStoriesRaw(...args: FunctionParameters<OperationMethods['StoryController_getAllStories']>) {
  const client = await clientPromise;
  return await client['StoryController_getAllStories'](...args);
}

export async function storyControllerGetStoryByNameRaw(...args: FunctionParameters<OperationMethods['StoryController_getStoryByName']>) {
  const client = await clientPromise;
  return await client['StoryController_getStoryByName'](...args);
}

export async function storyControllerGetStoryByIdRaw(...args: FunctionParameters<OperationMethods['StoryController_getStoryById']>) {
  const client = await clientPromise;
  return await client['StoryController_getStoryById'](...args);
}

export async function storyControllerGetLanguagesForCurrentStoryRaw(...args: FunctionParameters<OperationMethods['StoryController_getLanguagesForCurrentStory']>) {
  const client = await clientPromise;
  return await client['StoryController_getLanguagesForCurrentStory'](...args);
}

export async function storyControllerGetStoriesByEthnicGroupIdRaw(...args: FunctionParameters<OperationMethods['StoryController_getStoriesByEthnicGroupId']>) {
  const client = await clientPromise;
  return await client['StoryController_getStoriesByEthnicGroupId'](...args);
}

export async function storyControllerGetTextStoryByStoryIdRaw(...args: FunctionParameters<OperationMethods['StoryController_getTextStoryByStoryId']>) {
  const client = await clientPromise;
  return await client['StoryController_getTextStoryByStoryId'](...args);
}

export async function storyControllerGetAudioStoryByIdRaw(...args: FunctionParameters<OperationMethods['StoryController_getAudioStoryById']>) {
  const client = await clientPromise;
  return await client['StoryController_getAudioStoryById'](...args);
}

export async function storyControllerSetUserAudioToStoryRaw(...args: FunctionParameters<OperationMethods['StoryController_setUserAudioToStory']>) {
  const client = await clientPromise;
  return await client['StoryController_setUserAudioToStory'](...args);
}

export async function storyControllerGetImgStoryByIdRaw(...args: FunctionParameters<OperationMethods['StoryController_getImgStoryById']>) {
  const client = await clientPromise;
  return await client['StoryController_getImgStoryById'](...args);
}

export async function storyControllerUploadStoryImageRaw(...args: FunctionParameters<OperationMethods['StoryController_uploadStoryImage']>) {
  const client = await clientPromise;
  return await client['StoryController_uploadStoryImage'](...args);
}

export async function storyControllerDeleteStoryImgByStoryIdRaw(...args: FunctionParameters<OperationMethods['StoryController_deleteStoryImgByStoryId']>) {
  const client = await clientPromise;
  return await client['StoryController_deleteStoryImgByStoryId'](...args);
}

export async function storyControllerGetRatingByAudioIdRaw(...args: FunctionParameters<OperationMethods['StoryController_getRatingByAudioId']>) {
  const client = await clientPromise;
  return await client['StoryController_getRatingByAudioId'](...args);
}

export async function storyControllerGetRatingByAudioIdForCurrentUserRaw(...args: FunctionParameters<OperationMethods['StoryController_getRatingByAudioIdForCurrentUser']>) {
  const client = await clientPromise;
  return await client['StoryController_getRatingByAudioIdForCurrentUser'](...args);
}

export async function storyControllerAddRatingForStoryByCurrentUserRaw(...args: FunctionParameters<OperationMethods['StoryController_addRatingForStoryByCurrentUser']>) {
  const client = await clientPromise;
  return await client['StoryController_addRatingForStoryByCurrentUser'](...args);
}

export async function userAudioControllerGetCurrentUserAudiosRaw(...args: FunctionParameters<OperationMethods['UserAudioController_getCurrentUserAudios']>) {
  const client = await clientPromise;
  return await client['UserAudioController_getCurrentUserAudios'](...args);
}

export async function userAudioControllerGetApprovedUserAudiosCurrentUserRaw(...args: FunctionParameters<OperationMethods['UserAudioController_getApprovedUserAudiosCurrentUser']>) {
  const client = await clientPromise;
  return await client['UserAudioController_getApprovedUserAudiosCurrentUser'](...args);
}

export async function userAudioControllerGetUserAudioByIdRaw(...args: FunctionParameters<OperationMethods['UserAudioController_getUserAudioById']>) {
  const client = await clientPromise;
  return await client['UserAudioController_getUserAudioById'](...args);
}

export async function userAudioControllerUploadUserAudioRaw(...args: FunctionParameters<OperationMethods['UserAudioController_uploadUserAudio']>) {
  const client = await clientPromise;
  return await client['UserAudioController_uploadUserAudio'](...args);
}

export async function userAudioControllerDeleteUserAudioByIdRaw(...args: FunctionParameters<OperationMethods['UserAudioController_deleteUserAudioById']>) {
  const client = await clientPromise;
  return await client['UserAudioController_deleteUserAudioById'](...args);
}

export async function audioStoryRequestControllerGetAllAudioStoryRequestsCurrentUserRaw(...args: FunctionParameters<OperationMethods['AudioStoryRequestController_getAllAudioStoryRequestsCurrentUser']>) {
  const client = await clientPromise;
  return await client['AudioStoryRequestController_getAllAudioStoryRequestsCurrentUser'](...args);
}

export async function audioStoryRequestControllerGetAllAudioStoryRequestsRaw(...args: FunctionParameters<OperationMethods['AudioStoryRequestController_getAllAudioStoryRequests']>) {
  const client = await clientPromise;
  return await client['AudioStoryRequestController_getAllAudioStoryRequests'](...args);
}

export async function audioStoryRequestControllerGetAllAudioStoryReqeustsByUserIdRaw(...args: FunctionParameters<OperationMethods['AudioStoryRequestController_getAllAudioStoryReqeustsByUserId']>) {
  const client = await clientPromise;
  return await client['AudioStoryRequestController_getAllAudioStoryReqeustsByUserId'](...args);
}

export async function audioStoryRequestControllerCreateAddAudioRequestRaw(...args: FunctionParameters<OperationMethods['AudioStoryRequestController_createAddAudioRequest']>) {
  const client = await clientPromise;
  return await client['AudioStoryRequestController_createAddAudioRequest'](...args);
}

export async function audioStoryRequestControllerEditAudioStoryRequestRaw(...args: FunctionParameters<OperationMethods['AudioStoryRequestController_editAudioStoryRequest']>) {
  const client = await clientPromise;
  return await client['AudioStoryRequestController_editAudioStoryRequest'](...args);
}

export async function audioStoryRequestControllerDeleteAudioStoryRequestBydIdRaw(...args: FunctionParameters<OperationMethods['AudioStoryRequestController_deleteAudioStoryRequestBydId']>) {
  const client = await clientPromise;
  return await client['AudioStoryRequestController_deleteAudioStoryRequestBydId'](...args);
}

export async function requestControllerGetAllRequestTypesRaw(...args: FunctionParameters<OperationMethods['RequestController_getAllRequestTypes']>) {
  const client = await clientPromise;
  return await client['RequestController_getAllRequestTypes'](...args);
}

export async function requestControllerGetTypeRequestByIdRaw(...args: FunctionParameters<OperationMethods['RequestController_getTypeRequestById']>) {
  const client = await clientPromise;
  return await client['RequestController_getTypeRequestById'](...args);
}

export async function requestControllerAddTypeRequestRaw(...args: FunctionParameters<OperationMethods['RequestController_addTypeRequest']>) {
  const client = await clientPromise;
  return await client['RequestController_addTypeRequest'](...args);
}

export async function requestControllerEditTypeRequestRaw(...args: FunctionParameters<OperationMethods['RequestController_editTypeRequest']>) {
  const client = await clientPromise;
  return await client['RequestController_editTypeRequest'](...args);
}

export async function requestControllerDeleteTypeRequestByIdRaw(...args: FunctionParameters<OperationMethods['RequestController_deleteTypeRequestById']>) {
  const client = await clientPromise;
  return await client['RequestController_deleteTypeRequestById'](...args);
}

export async function requestControllerGetRequestStatusesRaw(...args: FunctionParameters<OperationMethods['RequestController_getRequestStatuses']>) {
  const client = await clientPromise;
  return await client['RequestController_getRequestStatuses'](...args);
}

export async function addStoryRequestControllerGetAddStoryRequestAllRaw(...args: FunctionParameters<OperationMethods['AddStoryRequestController_getAddStoryRequestAll']>) {
  const client = await clientPromise;
  return await client['AddStoryRequestController_getAddStoryRequestAll'](...args);
}

export async function addStoryRequestControllerGetAddStoryRequestForCurrentUserRaw(...args: FunctionParameters<OperationMethods['AddStoryRequestController_getAddStoryRequestForCurrentUser']>) {
  const client = await clientPromise;
  return await client['AddStoryRequestController_getAddStoryRequestForCurrentUser'](...args);
}

export async function addStoryRequestControllerGetAddStoryRequestByUserIdRaw(...args: FunctionParameters<OperationMethods['AddStoryRequestController_getAddStoryRequestByUserId']>) {
  const client = await clientPromise;
  return await client['AddStoryRequestController_getAddStoryRequestByUserId'](...args);
}

export async function addStoryRequestControllerCreateAddStoryRequestForCurrentUserRaw(...args: FunctionParameters<OperationMethods['AddStoryRequestController_createAddStoryRequestForCurrentUser']>) {
  const client = await clientPromise;
  return await client['AddStoryRequestController_createAddStoryRequestForCurrentUser'](...args);
}

export async function addStoryRequestControllerEditStatusAddStoryReqeustRaw(...args: FunctionParameters<OperationMethods['AddStoryRequestController_editStatusAddStoryReqeust']>) {
  const client = await clientPromise;
  return await client['AddStoryRequestController_editStatusAddStoryReqeust'](...args);
}

export async function addStoryRequestControllerDeleteAddStoryRequestByIdRaw(...args: FunctionParameters<OperationMethods['AddStoryRequestController_deleteAddStoryRequestById']>) {
  const client = await clientPromise;
  return await client['AddStoryRequestController_deleteAddStoryRequestById'](...args);
}

export async function authControllerSignUp(...args: FunctionParameters<OperationMethods['AuthController_signUp']>) {
  const response = await authControllerSignUpRaw(...args);
  return response.data;
}

export async function authControllerSignIn(...args: FunctionParameters<OperationMethods['AuthController_signIn']>) {
  const response = await authControllerSignInRaw(...args);
  return response.data;
}

export async function authControllerRefresh(...args: FunctionParameters<OperationMethods['AuthController_refresh']>) {
  const response = await authControllerRefreshRaw(...args);
  return response.data;
}

export async function authControllerLogout(...args: FunctionParameters<OperationMethods['AuthController_logout']>) {
  const response = await authControllerLogoutRaw(...args);
  return response.data;
}

export async function userControllerGetCurrentUserInfo(...args: FunctionParameters<OperationMethods['UserController_getCurrentUserInfo']>) {
  const response = await userControllerGetCurrentUserInfoRaw(...args);
  return response.data;
}

export async function userControllerFindUserById(...args: FunctionParameters<OperationMethods['UserController_findUserById']>) {
  const response = await userControllerFindUserByIdRaw(...args);
  return response.data;
}

export async function userControllerDeleteUser(...args: FunctionParameters<OperationMethods['UserController_deleteUser']>) {
  const response = await userControllerDeleteUserRaw(...args);
  return response.data;
}

export async function constituentsControllerAddConstituent(...args: FunctionParameters<OperationMethods['ConstituentsController_addConstituent']>) {
  const response = await constituentsControllerAddConstituentRaw(...args);
  return response.data;
}

export async function constituentsControllerAddEthnicGroupToConstituent(...args: FunctionParameters<OperationMethods['ConstituentsController_addEthnicGroupToConstituent']>) {
  const response = await constituentsControllerAddEthnicGroupToConstituentRaw(...args);
  return response.data;
}

export async function constituentsControllerDeleteEthnicGroupFromConstituent(...args: FunctionParameters<OperationMethods['ConstituentsController_deleteEthnicGroupFromConstituent']>) {
  const response = await constituentsControllerDeleteEthnicGroupFromConstituentRaw(...args);
  return response.data;
}

export async function constituentsControllerGetEthnicGroupByConstituentId(...args: FunctionParameters<OperationMethods['ConstituentsController_getEthnicGroupByConstituentId']>) {
  const response = await constituentsControllerGetEthnicGroupByConstituentIdRaw(...args);
  return response.data;
}

export async function constituentsControllerGetConstituents(...args: FunctionParameters<OperationMethods['ConstituentsController_getConstituents']>) {
  const response = await constituentsControllerGetConstituentsRaw(...args);
  return response.data;
}

export async function constituentsControllerEditConstituent(...args: FunctionParameters<OperationMethods['ConstituentsController_editConstituent']>) {
  const response = await constituentsControllerEditConstituentRaw(...args);
  return response.data;
}

export async function constituentsControllerDeleteConstituentById(...args: FunctionParameters<OperationMethods['ConstituentsController_deleteConstituentById']>) {
  const response = await constituentsControllerDeleteConstituentByIdRaw(...args);
  return response.data;
}

export async function ethnicGroupControllerAddEthnicGroup(...args: FunctionParameters<OperationMethods['EthnicGroupController_addEthnicGroup']>) {
  const response = await ethnicGroupControllerAddEthnicGroupRaw(...args);
  return response.data;
}

export async function ethnicGroupControllerEthnicGroups(...args: FunctionParameters<OperationMethods['EthnicGroupController_ethnicGroups']>) {
  const response = await ethnicGroupControllerEthnicGroupsRaw(...args);
  return response.data;
}

export async function ethnicGroupControllerGetEthnicGroupById(...args: FunctionParameters<OperationMethods['EthnicGroupController_getEthnicGroupById']>) {
  const response = await ethnicGroupControllerGetEthnicGroupByIdRaw(...args);
  return response.data;
}

export async function ethnicGroupControllerEditEthnicGroup(...args: FunctionParameters<OperationMethods['EthnicGroupController_editEthnicGroup']>) {
  const response = await ethnicGroupControllerEditEthnicGroupRaw(...args);
  return response.data;
}

export async function ethnicGroupControllerDeleteEthnicGroup(...args: FunctionParameters<OperationMethods['EthnicGroupController_deleteEthnicGroup']>) {
  const response = await ethnicGroupControllerDeleteEthnicGroupRaw(...args);
  return response.data;
}

export async function ethnicGroupControllerAddLanguage(...args: FunctionParameters<OperationMethods['EthnicGroupController_addLanguage']>) {
  const response = await ethnicGroupControllerAddLanguageRaw(...args);
  return response.data;
}

export async function ethnicGroupControllerGetAllLanguage(...args: FunctionParameters<OperationMethods['EthnicGroupController_getAllLanguage']>) {
  const response = await ethnicGroupControllerGetAllLanguageRaw(...args);
  return response.data;
}

export async function ethnicGroupControllerDeleteLanguageById(...args: FunctionParameters<OperationMethods['EthnicGroupController_deleteLanguageById']>) {
  const response = await ethnicGroupControllerDeleteLanguageByIdRaw(...args);
  return response.data;
}

export async function mapControllerGetMapTopojson(...args: FunctionParameters<OperationMethods['MapController_getMapTopojson']>) {
  const response = await mapControllerGetMapTopojsonRaw(...args);
  return response.data;
}

export async function mapControllerGetEthnicalGroupPoints(...args: FunctionParameters<OperationMethods['MapController_getEthnicalGroupPoints']>) {
  const response = await mapControllerGetEthnicalGroupPointsRaw(...args);
  return response.data;
}

export async function mapControllerGetEthnicalGroupPointsByConstituentId(...args: FunctionParameters<OperationMethods['MapController_getEthnicalGroupPointsByConstituentId']>) {
  const response = await mapControllerGetEthnicalGroupPointsByConstituentIdRaw(...args);
  return response.data;
}

export async function mapControllerGetEthnicGroupPointsByName(...args: FunctionParameters<OperationMethods['MapController_getEthnicGroupPointsByName']>) {
  const response = await mapControllerGetEthnicGroupPointsByNameRaw(...args);
  return response.data;
}

export async function mapControllerDeleteEthnicalGroupPoint(...args: FunctionParameters<OperationMethods['MapController_deleteEthnicalGroupPoint']>) {
  const response = await mapControllerDeleteEthnicalGroupPointRaw(...args);
  return response.data;
}

export async function mapControllerGetPercentsFilledStoriesByConstituentId(...args: FunctionParameters<OperationMethods['MapController_getPercentsFilledStoriesByConstituentId']>) {
  const response = await mapControllerGetPercentsFilledStoriesByConstituentIdRaw(...args);
  return response.data;
}

export async function adminControllerAddEthnicalGroupPoint(...args: FunctionParameters<OperationMethods['AdminController_addEthnicalGroupPoint']>) {
  const response = await adminControllerAddEthnicalGroupPointRaw(...args);
  return response.data;
}

export async function adminControllerDeleteEthnicalGroupPoint(...args: FunctionParameters<OperationMethods['AdminController_deleteEthnicalGroupPoint']>) {
  const response = await adminControllerDeleteEthnicalGroupPointRaw(...args);
  return response.data;
}

export async function adminControllerAddStory(...args: FunctionParameters<OperationMethods['AdminController_addStory']>) {
  const response = await adminControllerAddStoryRaw(...args);
  return response.data;
}

export async function adminControllerEditSotry(...args: FunctionParameters<OperationMethods['AdminController_editSotry']>) {
  const response = await adminControllerEditSotryRaw(...args);
  return response.data;
}

export async function adminControllerDeleteStoryById(...args: FunctionParameters<OperationMethods['AdminController_deleteStoryById']>) {
  const response = await adminControllerDeleteStoryByIdRaw(...args);
  return response.data;
}

export async function adminControllerAddTextStory(...args: FunctionParameters<OperationMethods['AdminController_addTextStory']>) {
  const response = await adminControllerAddTextStoryRaw(...args);
  return response.data;
}

export async function storyControllerGetAllStories(...args: FunctionParameters<OperationMethods['StoryController_getAllStories']>) {
  const response = await storyControllerGetAllStoriesRaw(...args);
  return response.data;
}

export async function storyControllerGetStoryByName(...args: FunctionParameters<OperationMethods['StoryController_getStoryByName']>) {
  const response = await storyControllerGetStoryByNameRaw(...args);
  return response.data;
}

export async function storyControllerGetStoryById(...args: FunctionParameters<OperationMethods['StoryController_getStoryById']>) {
  const response = await storyControllerGetStoryByIdRaw(...args);
  return response.data;
}

export async function storyControllerGetLanguagesForCurrentStory(...args: FunctionParameters<OperationMethods['StoryController_getLanguagesForCurrentStory']>) {
  const response = await storyControllerGetLanguagesForCurrentStoryRaw(...args);
  return response.data;
}

export async function storyControllerGetStoriesByEthnicGroupId(...args: FunctionParameters<OperationMethods['StoryController_getStoriesByEthnicGroupId']>) {
  const response = await storyControllerGetStoriesByEthnicGroupIdRaw(...args);
  return response.data;
}

export async function storyControllerGetTextStoryByStoryId(...args: FunctionParameters<OperationMethods['StoryController_getTextStoryByStoryId']>) {
  const response = await storyControllerGetTextStoryByStoryIdRaw(...args);
  return response.data;
}

export async function storyControllerGetAudioStoryById(...args: FunctionParameters<OperationMethods['StoryController_getAudioStoryById']>) {
  const response = await storyControllerGetAudioStoryByIdRaw(...args);
  return response.data;
}

export async function storyControllerSetUserAudioToStory(...args: FunctionParameters<OperationMethods['StoryController_setUserAudioToStory']>) {
  const response = await storyControllerSetUserAudioToStoryRaw(...args);
  return response.data;
}

export async function storyControllerGetImgStoryById(...args: FunctionParameters<OperationMethods['StoryController_getImgStoryById']>) {
  const response = await storyControllerGetImgStoryByIdRaw(...args);
  return response.data;
}

export async function storyControllerUploadStoryImage(...args: FunctionParameters<OperationMethods['StoryController_uploadStoryImage']>) {
  const response = await storyControllerUploadStoryImageRaw(...args);
  return response.data;
}

export async function storyControllerDeleteStoryImgByStoryId(...args: FunctionParameters<OperationMethods['StoryController_deleteStoryImgByStoryId']>) {
  const response = await storyControllerDeleteStoryImgByStoryIdRaw(...args);
  return response.data;
}

export async function storyControllerGetRatingByAudioId(...args: FunctionParameters<OperationMethods['StoryController_getRatingByAudioId']>) {
  const response = await storyControllerGetRatingByAudioIdRaw(...args);
  return response.data;
}

export async function storyControllerGetRatingByAudioIdForCurrentUser(...args: FunctionParameters<OperationMethods['StoryController_getRatingByAudioIdForCurrentUser']>) {
  const response = await storyControllerGetRatingByAudioIdForCurrentUserRaw(...args);
  return response.data;
}

export async function storyControllerAddRatingForStoryByCurrentUser(...args: FunctionParameters<OperationMethods['StoryController_addRatingForStoryByCurrentUser']>) {
  const response = await storyControllerAddRatingForStoryByCurrentUserRaw(...args);
  return response.data;
}

export async function userAudioControllerGetCurrentUserAudios(...args: FunctionParameters<OperationMethods['UserAudioController_getCurrentUserAudios']>) {
  const response = await userAudioControllerGetCurrentUserAudiosRaw(...args);
  return response.data;
}

export async function userAudioControllerGetApprovedUserAudiosCurrentUser(...args: FunctionParameters<OperationMethods['UserAudioController_getApprovedUserAudiosCurrentUser']>) {
  const response = await userAudioControllerGetApprovedUserAudiosCurrentUserRaw(...args);
  return response.data;
}

export async function userAudioControllerGetUserAudioById(...args: FunctionParameters<OperationMethods['UserAudioController_getUserAudioById']>) {
  const response = await userAudioControllerGetUserAudioByIdRaw(...args);
  return response.data;
}

export async function userAudioControllerUploadUserAudio(...args: FunctionParameters<OperationMethods['UserAudioController_uploadUserAudio']>) {
  const response = await userAudioControllerUploadUserAudioRaw(...args);
  return response.data;
}

export async function userAudioControllerDeleteUserAudioById(...args: FunctionParameters<OperationMethods['UserAudioController_deleteUserAudioById']>) {
  const response = await userAudioControllerDeleteUserAudioByIdRaw(...args);
  return response.data;
}

export async function audioStoryRequestControllerGetAllAudioStoryRequestsCurrentUser(...args: FunctionParameters<OperationMethods['AudioStoryRequestController_getAllAudioStoryRequestsCurrentUser']>) {
  const response = await audioStoryRequestControllerGetAllAudioStoryRequestsCurrentUserRaw(...args);
  return response.data;
}

export async function audioStoryRequestControllerGetAllAudioStoryRequests(...args: FunctionParameters<OperationMethods['AudioStoryRequestController_getAllAudioStoryRequests']>) {
  const response = await audioStoryRequestControllerGetAllAudioStoryRequestsRaw(...args);
  return response.data;
}

export async function audioStoryRequestControllerGetAllAudioStoryReqeustsByUserId(...args: FunctionParameters<OperationMethods['AudioStoryRequestController_getAllAudioStoryReqeustsByUserId']>) {
  const response = await audioStoryRequestControllerGetAllAudioStoryReqeustsByUserIdRaw(...args);
  return response.data;
}

export async function audioStoryRequestControllerCreateAddAudioRequest(...args: FunctionParameters<OperationMethods['AudioStoryRequestController_createAddAudioRequest']>) {
  const response = await audioStoryRequestControllerCreateAddAudioRequestRaw(...args);
  return response.data;
}

export async function audioStoryRequestControllerEditAudioStoryRequest(...args: FunctionParameters<OperationMethods['AudioStoryRequestController_editAudioStoryRequest']>) {
  const response = await audioStoryRequestControllerEditAudioStoryRequestRaw(...args);
  return response.data;
}

export async function audioStoryRequestControllerDeleteAudioStoryRequestBydId(...args: FunctionParameters<OperationMethods['AudioStoryRequestController_deleteAudioStoryRequestBydId']>) {
  const response = await audioStoryRequestControllerDeleteAudioStoryRequestBydIdRaw(...args);
  return response.data;
}

export async function requestControllerGetAllRequestTypes(...args: FunctionParameters<OperationMethods['RequestController_getAllRequestTypes']>) {
  const response = await requestControllerGetAllRequestTypesRaw(...args);
  return response.data;
}

export async function requestControllerGetTypeRequestById(...args: FunctionParameters<OperationMethods['RequestController_getTypeRequestById']>) {
  const response = await requestControllerGetTypeRequestByIdRaw(...args);
  return response.data;
}

export async function requestControllerAddTypeRequest(...args: FunctionParameters<OperationMethods['RequestController_addTypeRequest']>) {
  const response = await requestControllerAddTypeRequestRaw(...args);
  return response.data;
}

export async function requestControllerEditTypeRequest(...args: FunctionParameters<OperationMethods['RequestController_editTypeRequest']>) {
  const response = await requestControllerEditTypeRequestRaw(...args);
  return response.data;
}

export async function requestControllerDeleteTypeRequestById(...args: FunctionParameters<OperationMethods['RequestController_deleteTypeRequestById']>) {
  const response = await requestControllerDeleteTypeRequestByIdRaw(...args);
  return response.data;
}

export async function requestControllerGetRequestStatuses(...args: FunctionParameters<OperationMethods['RequestController_getRequestStatuses']>) {
  const response = await requestControllerGetRequestStatusesRaw(...args);
  return response.data;
}

export async function addStoryRequestControllerGetAddStoryRequestAll(...args: FunctionParameters<OperationMethods['AddStoryRequestController_getAddStoryRequestAll']>) {
  const response = await addStoryRequestControllerGetAddStoryRequestAllRaw(...args);
  return response.data;
}

export async function addStoryRequestControllerGetAddStoryRequestForCurrentUser(...args: FunctionParameters<OperationMethods['AddStoryRequestController_getAddStoryRequestForCurrentUser']>) {
  const response = await addStoryRequestControllerGetAddStoryRequestForCurrentUserRaw(...args);
  return response.data;
}

export async function addStoryRequestControllerGetAddStoryRequestByUserId(...args: FunctionParameters<OperationMethods['AddStoryRequestController_getAddStoryRequestByUserId']>) {
  const response = await addStoryRequestControllerGetAddStoryRequestByUserIdRaw(...args);
  return response.data;
}

export async function addStoryRequestControllerCreateAddStoryRequestForCurrentUser(...args: FunctionParameters<OperationMethods['AddStoryRequestController_createAddStoryRequestForCurrentUser']>) {
  const response = await addStoryRequestControllerCreateAddStoryRequestForCurrentUserRaw(...args);
  return response.data;
}

export async function addStoryRequestControllerEditStatusAddStoryReqeust(...args: FunctionParameters<OperationMethods['AddStoryRequestController_editStatusAddStoryReqeust']>) {
  const response = await addStoryRequestControllerEditStatusAddStoryReqeustRaw(...args);
  return response.data;
}

export async function addStoryRequestControllerDeleteAddStoryRequestById(...args: FunctionParameters<OperationMethods['AddStoryRequestController_deleteAddStoryRequestById']>) {
  const response = await addStoryRequestControllerDeleteAddStoryRequestByIdRaw(...args);
  return response.data;
}

export const [useUserControllerGetCurrentUserInfoRaw, refetchUserControllerGetCurrentUserInfo, useUserControllerGetCurrentUserInfoRawSafe] = create(userControllerGetCurrentUserInfoRaw, { id: 'react-openapi-client-generator-userControllerGetCurrentUserInfo' });

export const [useUserControllerFindUserByIdRaw, refetchUserControllerFindUserById, useUserControllerFindUserByIdRawSafe] = create(userControllerFindUserByIdRaw, { id: 'react-openapi-client-generator-userControllerFindUserById' });

export const [useConstituentsControllerGetEthnicGroupByConstituentIdRaw, refetchConstituentsControllerGetEthnicGroupByConstituentId, useConstituentsControllerGetEthnicGroupByConstituentIdRawSafe] = create(constituentsControllerGetEthnicGroupByConstituentIdRaw, { id: 'react-openapi-client-generator-constituentsControllerGetEthnicGroupByConstituentId' });

export const [useConstituentsControllerGetConstituentsRaw, refetchConstituentsControllerGetConstituents, useConstituentsControllerGetConstituentsRawSafe] = create(constituentsControllerGetConstituentsRaw, { id: 'react-openapi-client-generator-constituentsControllerGetConstituents' });

export const [useEthnicGroupControllerEthnicGroupsRaw, refetchEthnicGroupControllerEthnicGroups, useEthnicGroupControllerEthnicGroupsRawSafe] = create(ethnicGroupControllerEthnicGroupsRaw, { id: 'react-openapi-client-generator-ethnicGroupControllerEthnicGroups' });

export const [useEthnicGroupControllerGetEthnicGroupByIdRaw, refetchEthnicGroupControllerGetEthnicGroupById, useEthnicGroupControllerGetEthnicGroupByIdRawSafe] = create(ethnicGroupControllerGetEthnicGroupByIdRaw, { id: 'react-openapi-client-generator-ethnicGroupControllerGetEthnicGroupById' });

export const [useEthnicGroupControllerGetAllLanguageRaw, refetchEthnicGroupControllerGetAllLanguage, useEthnicGroupControllerGetAllLanguageRawSafe] = create(ethnicGroupControllerGetAllLanguageRaw, { id: 'react-openapi-client-generator-ethnicGroupControllerGetAllLanguage' });

export const [useMapControllerGetMapTopojsonRaw, refetchMapControllerGetMapTopojson, useMapControllerGetMapTopojsonRawSafe] = create(mapControllerGetMapTopojsonRaw, { id: 'react-openapi-client-generator-mapControllerGetMapTopojson' });

export const [useMapControllerGetEthnicalGroupPointsRaw, refetchMapControllerGetEthnicalGroupPoints, useMapControllerGetEthnicalGroupPointsRawSafe] = create(mapControllerGetEthnicalGroupPointsRaw, { id: 'react-openapi-client-generator-mapControllerGetEthnicalGroupPoints' });

export const [useMapControllerGetEthnicalGroupPointsByConstituentIdRaw, refetchMapControllerGetEthnicalGroupPointsByConstituentId, useMapControllerGetEthnicalGroupPointsByConstituentIdRawSafe] = create(mapControllerGetEthnicalGroupPointsByConstituentIdRaw, { id: 'react-openapi-client-generator-mapControllerGetEthnicalGroupPointsByConstituentId' });

export const [useMapControllerGetEthnicGroupPointsByNameRaw, refetchMapControllerGetEthnicGroupPointsByName, useMapControllerGetEthnicGroupPointsByNameRawSafe] = create(mapControllerGetEthnicGroupPointsByNameRaw, { id: 'react-openapi-client-generator-mapControllerGetEthnicGroupPointsByName' });

export const [useMapControllerGetPercentsFilledStoriesByConstituentIdRaw, refetchMapControllerGetPercentsFilledStoriesByConstituentId, useMapControllerGetPercentsFilledStoriesByConstituentIdRawSafe] = create(mapControllerGetPercentsFilledStoriesByConstituentIdRaw, { id: 'react-openapi-client-generator-mapControllerGetPercentsFilledStoriesByConstituentId' });

export const [useStoryControllerGetAllStoriesRaw, refetchStoryControllerGetAllStories, useStoryControllerGetAllStoriesRawSafe] = create(storyControllerGetAllStoriesRaw, { id: 'react-openapi-client-generator-storyControllerGetAllStories' });

export const [useStoryControllerGetStoryByNameRaw, refetchStoryControllerGetStoryByName, useStoryControllerGetStoryByNameRawSafe] = create(storyControllerGetStoryByNameRaw, { id: 'react-openapi-client-generator-storyControllerGetStoryByName' });

export const [useStoryControllerGetStoryByIdRaw, refetchStoryControllerGetStoryById, useStoryControllerGetStoryByIdRawSafe] = create(storyControllerGetStoryByIdRaw, { id: 'react-openapi-client-generator-storyControllerGetStoryById' });

export const [useStoryControllerGetLanguagesForCurrentStoryRaw, refetchStoryControllerGetLanguagesForCurrentStory, useStoryControllerGetLanguagesForCurrentStoryRawSafe] = create(storyControllerGetLanguagesForCurrentStoryRaw, { id: 'react-openapi-client-generator-storyControllerGetLanguagesForCurrentStory' });

export const [useStoryControllerGetStoriesByEthnicGroupIdRaw, refetchStoryControllerGetStoriesByEthnicGroupId, useStoryControllerGetStoriesByEthnicGroupIdRawSafe] = create(storyControllerGetStoriesByEthnicGroupIdRaw, { id: 'react-openapi-client-generator-storyControllerGetStoriesByEthnicGroupId' });

export const [useStoryControllerGetTextStoryByStoryIdRaw, refetchStoryControllerGetTextStoryByStoryId, useStoryControllerGetTextStoryByStoryIdRawSafe] = create(storyControllerGetTextStoryByStoryIdRaw, { id: 'react-openapi-client-generator-storyControllerGetTextStoryByStoryId' });

export const [useStoryControllerGetAudioStoryByIdRaw, refetchStoryControllerGetAudioStoryById, useStoryControllerGetAudioStoryByIdRawSafe] = create(storyControllerGetAudioStoryByIdRaw, { id: 'react-openapi-client-generator-storyControllerGetAudioStoryById' });

export const [useStoryControllerGetImgStoryByIdRaw, refetchStoryControllerGetImgStoryById, useStoryControllerGetImgStoryByIdRawSafe] = create(storyControllerGetImgStoryByIdRaw, { id: 'react-openapi-client-generator-storyControllerGetImgStoryById' });

export const [useStoryControllerGetRatingByAudioIdRaw, refetchStoryControllerGetRatingByAudioId, useStoryControllerGetRatingByAudioIdRawSafe] = create(storyControllerGetRatingByAudioIdRaw, { id: 'react-openapi-client-generator-storyControllerGetRatingByAudioId' });

export const [useStoryControllerGetRatingByAudioIdForCurrentUserRaw, refetchStoryControllerGetRatingByAudioIdForCurrentUser, useStoryControllerGetRatingByAudioIdForCurrentUserRawSafe] = create(storyControllerGetRatingByAudioIdForCurrentUserRaw, { id: 'react-openapi-client-generator-storyControllerGetRatingByAudioIdForCurrentUser' });

export const [useUserAudioControllerGetCurrentUserAudiosRaw, refetchUserAudioControllerGetCurrentUserAudios, useUserAudioControllerGetCurrentUserAudiosRawSafe] = create(userAudioControllerGetCurrentUserAudiosRaw, { id: 'react-openapi-client-generator-userAudioControllerGetCurrentUserAudios' });

export const [useUserAudioControllerGetApprovedUserAudiosCurrentUserRaw, refetchUserAudioControllerGetApprovedUserAudiosCurrentUser, useUserAudioControllerGetApprovedUserAudiosCurrentUserRawSafe] = create(userAudioControllerGetApprovedUserAudiosCurrentUserRaw, { id: 'react-openapi-client-generator-userAudioControllerGetApprovedUserAudiosCurrentUser' });

export const [useUserAudioControllerGetUserAudioByIdRaw, refetchUserAudioControllerGetUserAudioById, useUserAudioControllerGetUserAudioByIdRawSafe] = create(userAudioControllerGetUserAudioByIdRaw, { id: 'react-openapi-client-generator-userAudioControllerGetUserAudioById' });

export const [useAudioStoryRequestControllerGetAllAudioStoryRequestsCurrentUserRaw, refetchAudioStoryRequestControllerGetAllAudioStoryRequestsCurrentUser, useAudioStoryRequestControllerGetAllAudioStoryRequestsCurrentUserRawSafe] = create(audioStoryRequestControllerGetAllAudioStoryRequestsCurrentUserRaw, { id: 'react-openapi-client-generator-audioStoryRequestControllerGetAllAudioStoryRequestsCurrentUser' });

export const [useAudioStoryRequestControllerGetAllAudioStoryRequestsRaw, refetchAudioStoryRequestControllerGetAllAudioStoryRequests, useAudioStoryRequestControllerGetAllAudioStoryRequestsRawSafe] = create(audioStoryRequestControllerGetAllAudioStoryRequestsRaw, { id: 'react-openapi-client-generator-audioStoryRequestControllerGetAllAudioStoryRequests' });

export const [useAudioStoryRequestControllerGetAllAudioStoryReqeustsByUserIdRaw, refetchAudioStoryRequestControllerGetAllAudioStoryReqeustsByUserId, useAudioStoryRequestControllerGetAllAudioStoryReqeustsByUserIdRawSafe] = create(audioStoryRequestControllerGetAllAudioStoryReqeustsByUserIdRaw, { id: 'react-openapi-client-generator-audioStoryRequestControllerGetAllAudioStoryReqeustsByUserId' });

export const [useRequestControllerGetAllRequestTypesRaw, refetchRequestControllerGetAllRequestTypes, useRequestControllerGetAllRequestTypesRawSafe] = create(requestControllerGetAllRequestTypesRaw, { id: 'react-openapi-client-generator-requestControllerGetAllRequestTypes' });

export const [useRequestControllerGetTypeRequestByIdRaw, refetchRequestControllerGetTypeRequestById, useRequestControllerGetTypeRequestByIdRawSafe] = create(requestControllerGetTypeRequestByIdRaw, { id: 'react-openapi-client-generator-requestControllerGetTypeRequestById' });

export const [useRequestControllerGetRequestStatusesRaw, refetchRequestControllerGetRequestStatuses, useRequestControllerGetRequestStatusesRawSafe] = create(requestControllerGetRequestStatusesRaw, { id: 'react-openapi-client-generator-requestControllerGetRequestStatuses' });

export const [useAddStoryRequestControllerGetAddStoryRequestAllRaw, refetchAddStoryRequestControllerGetAddStoryRequestAll, useAddStoryRequestControllerGetAddStoryRequestAllRawSafe] = create(addStoryRequestControllerGetAddStoryRequestAllRaw, { id: 'react-openapi-client-generator-addStoryRequestControllerGetAddStoryRequestAll' });

export const [useAddStoryRequestControllerGetAddStoryRequestForCurrentUserRaw, refetchAddStoryRequestControllerGetAddStoryRequestForCurrentUser, useAddStoryRequestControllerGetAddStoryRequestForCurrentUserRawSafe] = create(addStoryRequestControllerGetAddStoryRequestForCurrentUserRaw, { id: 'react-openapi-client-generator-addStoryRequestControllerGetAddStoryRequestForCurrentUser' });

export const [useAddStoryRequestControllerGetAddStoryRequestByUserIdRaw, refetchAddStoryRequestControllerGetAddStoryRequestByUserId, useAddStoryRequestControllerGetAddStoryRequestByUserIdRawSafe] = create(addStoryRequestControllerGetAddStoryRequestByUserIdRaw, { id: 'react-openapi-client-generator-addStoryRequestControllerGetAddStoryRequestByUserId' });

export function useUserControllerGetCurrentUserInfo(...args: FunctionParameters<OperationMethods['UserController_getCurrentUserInfo']>) {
  return useUserControllerGetCurrentUserInfoRaw(...args).data;
}

export function useUserControllerFindUserById(...args: FunctionParameters<OperationMethods['UserController_findUserById']>) {
  return useUserControllerFindUserByIdRaw(...args).data;
}

export function useConstituentsControllerGetEthnicGroupByConstituentId(...args: FunctionParameters<OperationMethods['ConstituentsController_getEthnicGroupByConstituentId']>) {
  return useConstituentsControllerGetEthnicGroupByConstituentIdRaw(...args).data;
}

export function useConstituentsControllerGetConstituents(...args: FunctionParameters<OperationMethods['ConstituentsController_getConstituents']>) {
  return useConstituentsControllerGetConstituentsRaw(...args).data;
}

export function useEthnicGroupControllerEthnicGroups(...args: FunctionParameters<OperationMethods['EthnicGroupController_ethnicGroups']>) {
  return useEthnicGroupControllerEthnicGroupsRaw(...args).data;
}

export function useEthnicGroupControllerGetEthnicGroupById(...args: FunctionParameters<OperationMethods['EthnicGroupController_getEthnicGroupById']>) {
  return useEthnicGroupControllerGetEthnicGroupByIdRaw(...args).data;
}

export function useEthnicGroupControllerGetAllLanguage(...args: FunctionParameters<OperationMethods['EthnicGroupController_getAllLanguage']>) {
  return useEthnicGroupControllerGetAllLanguageRaw(...args).data;
}

export function useMapControllerGetMapTopojson(...args: FunctionParameters<OperationMethods['MapController_getMapTopojson']>) {
  return useMapControllerGetMapTopojsonRaw(...args).data;
}

export function useMapControllerGetEthnicalGroupPoints(...args: FunctionParameters<OperationMethods['MapController_getEthnicalGroupPoints']>) {
  return useMapControllerGetEthnicalGroupPointsRaw(...args).data;
}

export function useMapControllerGetEthnicalGroupPointsByConstituentId(...args: FunctionParameters<OperationMethods['MapController_getEthnicalGroupPointsByConstituentId']>) {
  return useMapControllerGetEthnicalGroupPointsByConstituentIdRaw(...args).data;
}

export function useMapControllerGetEthnicGroupPointsByName(...args: FunctionParameters<OperationMethods['MapController_getEthnicGroupPointsByName']>) {
  return useMapControllerGetEthnicGroupPointsByNameRaw(...args).data;
}

export function useMapControllerGetPercentsFilledStoriesByConstituentId(...args: FunctionParameters<OperationMethods['MapController_getPercentsFilledStoriesByConstituentId']>) {
  return useMapControllerGetPercentsFilledStoriesByConstituentIdRaw(...args).data;
}

export function useStoryControllerGetAllStories(...args: FunctionParameters<OperationMethods['StoryController_getAllStories']>) {
  return useStoryControllerGetAllStoriesRaw(...args).data;
}

export function useStoryControllerGetStoryByName(...args: FunctionParameters<OperationMethods['StoryController_getStoryByName']>) {
  return useStoryControllerGetStoryByNameRaw(...args).data;
}

export function useStoryControllerGetStoryById(...args: FunctionParameters<OperationMethods['StoryController_getStoryById']>) {
  return useStoryControllerGetStoryByIdRaw(...args).data;
}

export function useStoryControllerGetLanguagesForCurrentStory(...args: FunctionParameters<OperationMethods['StoryController_getLanguagesForCurrentStory']>) {
  return useStoryControllerGetLanguagesForCurrentStoryRaw(...args).data;
}

export function useStoryControllerGetStoriesByEthnicGroupId(...args: FunctionParameters<OperationMethods['StoryController_getStoriesByEthnicGroupId']>) {
  return useStoryControllerGetStoriesByEthnicGroupIdRaw(...args).data;
}

export function useStoryControllerGetTextStoryByStoryId(...args: FunctionParameters<OperationMethods['StoryController_getTextStoryByStoryId']>) {
  return useStoryControllerGetTextStoryByStoryIdRaw(...args).data;
}

export function useStoryControllerGetAudioStoryById(...args: FunctionParameters<OperationMethods['StoryController_getAudioStoryById']>) {
  return useStoryControllerGetAudioStoryByIdRaw(...args).data;
}

export function useStoryControllerGetImgStoryById(...args: FunctionParameters<OperationMethods['StoryController_getImgStoryById']>) {
  return useStoryControllerGetImgStoryByIdRaw(...args).data;
}

export function useStoryControllerGetRatingByAudioId(...args: FunctionParameters<OperationMethods['StoryController_getRatingByAudioId']>) {
  return useStoryControllerGetRatingByAudioIdRaw(...args).data;
}

export function useStoryControllerGetRatingByAudioIdForCurrentUser(...args: FunctionParameters<OperationMethods['StoryController_getRatingByAudioIdForCurrentUser']>) {
  return useStoryControllerGetRatingByAudioIdForCurrentUserRaw(...args).data;
}

export function useUserAudioControllerGetCurrentUserAudios(...args: FunctionParameters<OperationMethods['UserAudioController_getCurrentUserAudios']>) {
  return useUserAudioControllerGetCurrentUserAudiosRaw(...args).data;
}

export function useUserAudioControllerGetApprovedUserAudiosCurrentUser(...args: FunctionParameters<OperationMethods['UserAudioController_getApprovedUserAudiosCurrentUser']>) {
  return useUserAudioControllerGetApprovedUserAudiosCurrentUserRaw(...args).data;
}

export function useUserAudioControllerGetUserAudioById(...args: FunctionParameters<OperationMethods['UserAudioController_getUserAudioById']>) {
  return useUserAudioControllerGetUserAudioByIdRaw(...args).data;
}

export function useAudioStoryRequestControllerGetAllAudioStoryRequestsCurrentUser(...args: FunctionParameters<OperationMethods['AudioStoryRequestController_getAllAudioStoryRequestsCurrentUser']>) {
  return useAudioStoryRequestControllerGetAllAudioStoryRequestsCurrentUserRaw(...args).data;
}

export function useAudioStoryRequestControllerGetAllAudioStoryRequests(...args: FunctionParameters<OperationMethods['AudioStoryRequestController_getAllAudioStoryRequests']>) {
  return useAudioStoryRequestControllerGetAllAudioStoryRequestsRaw(...args).data;
}

export function useAudioStoryRequestControllerGetAllAudioStoryReqeustsByUserId(...args: FunctionParameters<OperationMethods['AudioStoryRequestController_getAllAudioStoryReqeustsByUserId']>) {
  return useAudioStoryRequestControllerGetAllAudioStoryReqeustsByUserIdRaw(...args).data;
}

export function useRequestControllerGetAllRequestTypes(...args: FunctionParameters<OperationMethods['RequestController_getAllRequestTypes']>) {
  return useRequestControllerGetAllRequestTypesRaw(...args).data;
}

export function useRequestControllerGetTypeRequestById(...args: FunctionParameters<OperationMethods['RequestController_getTypeRequestById']>) {
  return useRequestControllerGetTypeRequestByIdRaw(...args).data;
}

export function useRequestControllerGetRequestStatuses(...args: FunctionParameters<OperationMethods['RequestController_getRequestStatuses']>) {
  return useRequestControllerGetRequestStatusesRaw(...args).data;
}

export function useAddStoryRequestControllerGetAddStoryRequestAll(...args: FunctionParameters<OperationMethods['AddStoryRequestController_getAddStoryRequestAll']>) {
  return useAddStoryRequestControllerGetAddStoryRequestAllRaw(...args).data;
}

export function useAddStoryRequestControllerGetAddStoryRequestForCurrentUser(...args: FunctionParameters<OperationMethods['AddStoryRequestController_getAddStoryRequestForCurrentUser']>) {
  return useAddStoryRequestControllerGetAddStoryRequestForCurrentUserRaw(...args).data;
}

export function useAddStoryRequestControllerGetAddStoryRequestByUserId(...args: FunctionParameters<OperationMethods['AddStoryRequestController_getAddStoryRequestByUserId']>) {
  return useAddStoryRequestControllerGetAddStoryRequestByUserIdRaw(...args).data;
}

export function useUserControllerGetCurrentUserInfoSafe(...args: FunctionParameters<OperationMethods['UserController_getCurrentUserInfo']>) {
  const [error, response] = useUserControllerGetCurrentUserInfoRawSafe(...args)
  return [error, response?.data];
}

export function useUserControllerFindUserByIdSafe(...args: FunctionParameters<OperationMethods['UserController_findUserById']>) {
  const [error, response] = useUserControllerFindUserByIdRawSafe(...args)
  return [error, response?.data];
}

export function useConstituentsControllerGetEthnicGroupByConstituentIdSafe(...args: FunctionParameters<OperationMethods['ConstituentsController_getEthnicGroupByConstituentId']>) {
  const [error, response] = useConstituentsControllerGetEthnicGroupByConstituentIdRawSafe(...args)
  return [error, response?.data];
}

export function useConstituentsControllerGetConstituentsSafe(...args: FunctionParameters<OperationMethods['ConstituentsController_getConstituents']>) {
  const [error, response] = useConstituentsControllerGetConstituentsRawSafe(...args)
  return [error, response?.data];
}

export function useEthnicGroupControllerEthnicGroupsSafe(...args: FunctionParameters<OperationMethods['EthnicGroupController_ethnicGroups']>) {
  const [error, response] = useEthnicGroupControllerEthnicGroupsRawSafe(...args)
  return [error, response?.data];
}

export function useEthnicGroupControllerGetEthnicGroupByIdSafe(...args: FunctionParameters<OperationMethods['EthnicGroupController_getEthnicGroupById']>) {
  const [error, response] = useEthnicGroupControllerGetEthnicGroupByIdRawSafe(...args)
  return [error, response?.data];
}

export function useEthnicGroupControllerGetAllLanguageSafe(...args: FunctionParameters<OperationMethods['EthnicGroupController_getAllLanguage']>) {
  const [error, response] = useEthnicGroupControllerGetAllLanguageRawSafe(...args)
  return [error, response?.data];
}

export function useMapControllerGetMapTopojsonSafe(...args: FunctionParameters<OperationMethods['MapController_getMapTopojson']>) {
  const [error, response] = useMapControllerGetMapTopojsonRawSafe(...args)
  return [error, response?.data];
}

export function useMapControllerGetEthnicalGroupPointsSafe(...args: FunctionParameters<OperationMethods['MapController_getEthnicalGroupPoints']>) {
  const [error, response] = useMapControllerGetEthnicalGroupPointsRawSafe(...args)
  return [error, response?.data];
}

export function useMapControllerGetEthnicalGroupPointsByConstituentIdSafe(...args: FunctionParameters<OperationMethods['MapController_getEthnicalGroupPointsByConstituentId']>) {
  const [error, response] = useMapControllerGetEthnicalGroupPointsByConstituentIdRawSafe(...args)
  return [error, response?.data];
}

export function useMapControllerGetEthnicGroupPointsByNameSafe(...args: FunctionParameters<OperationMethods['MapController_getEthnicGroupPointsByName']>) {
  const [error, response] = useMapControllerGetEthnicGroupPointsByNameRawSafe(...args)
  return [error, response?.data];
}

export function useMapControllerGetPercentsFilledStoriesByConstituentIdSafe(...args: FunctionParameters<OperationMethods['MapController_getPercentsFilledStoriesByConstituentId']>) {
  const [error, response] = useMapControllerGetPercentsFilledStoriesByConstituentIdRawSafe(...args)
  return [error, response?.data];
}

export function useStoryControllerGetAllStoriesSafe(...args: FunctionParameters<OperationMethods['StoryController_getAllStories']>) {
  const [error, response] = useStoryControllerGetAllStoriesRawSafe(...args)
  return [error, response?.data];
}

export function useStoryControllerGetStoryByNameSafe(...args: FunctionParameters<OperationMethods['StoryController_getStoryByName']>) {
  const [error, response] = useStoryControllerGetStoryByNameRawSafe(...args)
  return [error, response?.data];
}

export function useStoryControllerGetStoryByIdSafe(...args: FunctionParameters<OperationMethods['StoryController_getStoryById']>) {
  const [error, response] = useStoryControllerGetStoryByIdRawSafe(...args)
  return [error, response?.data];
}

export function useStoryControllerGetLanguagesForCurrentStorySafe(...args: FunctionParameters<OperationMethods['StoryController_getLanguagesForCurrentStory']>) {
  const [error, response] = useStoryControllerGetLanguagesForCurrentStoryRawSafe(...args)
  return [error, response?.data];
}

export function useStoryControllerGetStoriesByEthnicGroupIdSafe(...args: FunctionParameters<OperationMethods['StoryController_getStoriesByEthnicGroupId']>) {
  const [error, response] = useStoryControllerGetStoriesByEthnicGroupIdRawSafe(...args)
  return [error, response?.data];
}

export function useStoryControllerGetTextStoryByStoryIdSafe(...args: FunctionParameters<OperationMethods['StoryController_getTextStoryByStoryId']>) {
  const [error, response] = useStoryControllerGetTextStoryByStoryIdRawSafe(...args)
  return [error, response?.data];
}

export function useStoryControllerGetAudioStoryByIdSafe(...args: FunctionParameters<OperationMethods['StoryController_getAudioStoryById']>) {
  const [error, response] = useStoryControllerGetAudioStoryByIdRawSafe(...args)
  return [error, response?.data];
}

export function useStoryControllerGetImgStoryByIdSafe(...args: FunctionParameters<OperationMethods['StoryController_getImgStoryById']>) {
  const [error, response] = useStoryControllerGetImgStoryByIdRawSafe(...args)
  return [error, response?.data];
}

export function useStoryControllerGetRatingByAudioIdSafe(...args: FunctionParameters<OperationMethods['StoryController_getRatingByAudioId']>) {
  const [error, response] = useStoryControllerGetRatingByAudioIdRawSafe(...args)
  return [error, response?.data];
}

export function useStoryControllerGetRatingByAudioIdForCurrentUserSafe(...args: FunctionParameters<OperationMethods['StoryController_getRatingByAudioIdForCurrentUser']>) {
  const [error, response] = useStoryControllerGetRatingByAudioIdForCurrentUserRawSafe(...args)
  return [error, response?.data];
}

export function useUserAudioControllerGetCurrentUserAudiosSafe(...args: FunctionParameters<OperationMethods['UserAudioController_getCurrentUserAudios']>) {
  const [error, response] = useUserAudioControllerGetCurrentUserAudiosRawSafe(...args)
  return [error, response?.data];
}

export function useUserAudioControllerGetApprovedUserAudiosCurrentUserSafe(...args: FunctionParameters<OperationMethods['UserAudioController_getApprovedUserAudiosCurrentUser']>) {
  const [error, response] = useUserAudioControllerGetApprovedUserAudiosCurrentUserRawSafe(...args)
  return [error, response?.data];
}

export function useUserAudioControllerGetUserAudioByIdSafe(...args: FunctionParameters<OperationMethods['UserAudioController_getUserAudioById']>) {
  const [error, response] = useUserAudioControllerGetUserAudioByIdRawSafe(...args)
  return [error, response?.data];
}

export function useAudioStoryRequestControllerGetAllAudioStoryRequestsCurrentUserSafe(...args: FunctionParameters<OperationMethods['AudioStoryRequestController_getAllAudioStoryRequestsCurrentUser']>) {
  const [error, response] = useAudioStoryRequestControllerGetAllAudioStoryRequestsCurrentUserRawSafe(...args)
  return [error, response?.data];
}

export function useAudioStoryRequestControllerGetAllAudioStoryRequestsSafe(...args: FunctionParameters<OperationMethods['AudioStoryRequestController_getAllAudioStoryRequests']>) {
  const [error, response] = useAudioStoryRequestControllerGetAllAudioStoryRequestsRawSafe(...args)
  return [error, response?.data];
}

export function useAudioStoryRequestControllerGetAllAudioStoryReqeustsByUserIdSafe(...args: FunctionParameters<OperationMethods['AudioStoryRequestController_getAllAudioStoryReqeustsByUserId']>) {
  const [error, response] = useAudioStoryRequestControllerGetAllAudioStoryReqeustsByUserIdRawSafe(...args)
  return [error, response?.data];
}

export function useRequestControllerGetAllRequestTypesSafe(...args: FunctionParameters<OperationMethods['RequestController_getAllRequestTypes']>) {
  const [error, response] = useRequestControllerGetAllRequestTypesRawSafe(...args)
  return [error, response?.data];
}

export function useRequestControllerGetTypeRequestByIdSafe(...args: FunctionParameters<OperationMethods['RequestController_getTypeRequestById']>) {
  const [error, response] = useRequestControllerGetTypeRequestByIdRawSafe(...args)
  return [error, response?.data];
}

export function useRequestControllerGetRequestStatusesSafe(...args: FunctionParameters<OperationMethods['RequestController_getRequestStatuses']>) {
  const [error, response] = useRequestControllerGetRequestStatusesRawSafe(...args)
  return [error, response?.data];
}

export function useAddStoryRequestControllerGetAddStoryRequestAllSafe(...args: FunctionParameters<OperationMethods['AddStoryRequestController_getAddStoryRequestAll']>) {
  const [error, response] = useAddStoryRequestControllerGetAddStoryRequestAllRawSafe(...args)
  return [error, response?.data];
}

export function useAddStoryRequestControllerGetAddStoryRequestForCurrentUserSafe(...args: FunctionParameters<OperationMethods['AddStoryRequestController_getAddStoryRequestForCurrentUser']>) {
  const [error, response] = useAddStoryRequestControllerGetAddStoryRequestForCurrentUserRawSafe(...args)
  return [error, response?.data];
}

export function useAddStoryRequestControllerGetAddStoryRequestByUserIdSafe(...args: FunctionParameters<OperationMethods['AddStoryRequestController_getAddStoryRequestByUserId']>) {
  const [error, response] = useAddStoryRequestControllerGetAddStoryRequestByUserIdRawSafe(...args)
  return [error, response?.data];
}
