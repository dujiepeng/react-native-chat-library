import type { CameraRoll as MediaLibrary } from '@react-native-camera-roll/camera-roll';
import type Clipboard from '@react-native-clipboard/clipboard';
import type FirebaseMessage from '@react-native-firebase/messaging';
import type { AudioSet } from 'react-native-audio-recorder-player';
import type AudioRecorderPlayer from 'react-native-audio-recorder-player';
import type CreateThumbnail from 'react-native-create-thumbnail';
import type * as DocumentPicker from 'react-native-document-picker';
import type FileAccess from 'react-native-file-access';
import type ImagePicker from 'react-native-image-picker';
import type Permissions from 'react-native-permissions';
import type VideoComponent from 'react-native-video';

import type { Nullable } from '../types';

export type Unsubscribe = () => void | undefined;
export type FileType = {
  uri: string;
  size: number;
  name: string;
  type: string;
};

export interface VideoProps {
  source: { uri: string } | number;
  resizeMode?: 'cover' | 'contain' | 'stretch' | undefined;
  onLoad?: () => void | undefined;
}
export interface VideoThumbnailOptions {
  url: string;
  timeMills?: number;
  quality?: number;
}
export interface OpenResult {
  onOpenFailure?: (error: Error) => void;
}
export interface OpenMediaLibraryOptions extends OpenResult {
  selectionLimit?: number;
  mediaType?: 'photo' | 'video' | 'all';
}
export interface OpenCameraOptions extends OpenResult {
  cameraType?: 'front' | 'back';
  mediaType?: 'photo' | 'video' | 'all';
}
export type OpenDocumentOptions = OpenResult;
export interface SaveFileOptions {
  fileUrl: string;
  fileName: string;
  fileType?: string | null;
}
export interface RecordAudioOptions {
  url?: string;
  audio: AudioSet;
  onPosition?: (position: number) => void;
  onSaved?: (path: string) => void;
}
export interface PlayAudioOptions {
  url: string;
  opt?: Record<string, string>;
  onPlay?: ({
    isMuted,
    currentPosition,
    duration,
  }: {
    isMuted?: boolean;
    currentPosition: number;
    duration: number;
  }) => void;
  onFile?: (path: string) => void;
}
export type ClipboardServiceOption = {
  clipboard: typeof Clipboard;
};
export interface ClipboardService {
  setString(text: string): void;
  getString(): Promise<string>;
}
// export interface FileService {}
// export interface AudioService {}
export type MediaServiceOptions = {
  videoModule: typeof VideoComponent;
  videoThumbnail: typeof CreateThumbnail;
  imagePickerModule: typeof ImagePicker;
  documentPickerModule: typeof DocumentPicker;
  mediaLibraryModule: typeof MediaLibrary;
  fsModule: typeof FileAccess;
  audioRecorderModule: AudioRecorderPlayer;
  permission: PermissionService;
};
export interface MediaService {
  getVideoComponent<Props = {}>(props: VideoProps & Props): JSX.Element;
  getVideoThumbnail(
    options: VideoThumbnailOptions
  ): Promise<Nullable<{ path: string }>>;

  openMediaLibrary(
    options?: OpenMediaLibraryOptions
  ): Promise<Nullable<FileType>[]>;
  openCamera(options?: OpenCameraOptions): Promise<Nullable<FileType>>;
  openDocument(options?: OpenDocumentOptions): Promise<Nullable<FileType>>;
  /**
   * **NOTE**: On iOS, You can access the downloaded files by providing options below to info.plist
   * - Supports opening documents in place
   * - Application supports iTunes file sharing
   * @param options save file options.
   */
  save(options: SaveFileOptions): Promise<Nullable<string>>;

  startRecordAudio(option: RecordAudioOptions): Promise<boolean>;
  stopRecordAudio(): Promise<void>;
  playAudio(option: PlayAudioOptions): Promise<boolean>;
  stopAudio(): Promise<void>;
}
// export interface ImageService {}
// export interface NetworkService {}
export type PermissionServiceOption = {
  permissions: typeof Permissions;
  firebaseMessage: typeof FirebaseMessage;
};
export interface PermissionService {
  hasCameraPermission(): Promise<boolean>;
  requestCameraPermission(): Promise<boolean>;
  hasLocationPermission(): Promise<boolean>;
  requestLocationPermission(): Promise<boolean>;
  hasMediaLibraryPermission(): Promise<boolean>;
  requestMediaLibraryPermission(): Promise<boolean>;
  hasNotificationPermission(): Promise<boolean>;
  requestNotificationPermission(): Promise<boolean>;
}
export type NotificationServiceOption = {
  firebaseMessage: typeof FirebaseMessage;
  permission: PermissionService;
};
export interface NotificationService {
  getAPNSToken(): Promise<Nullable<string>>;
  getFCMToken(): Promise<Nullable<string>>;
  onTokenRefresh(handler: (token: string) => void): Unsubscribe;
}