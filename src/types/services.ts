/**
 * This module contains all the type definitions for the PCO Services API resources.
 *
 * @module
 */

import type { Resource, Response } from "./.";

/**
 * A union type representing any resource in the PCO Services API.
 *
 * @internal
 */
export type AnyResource =
  | Arrangement
  | ArrangementSections
  | Attachment
  | AttachmentActivity
  | AttachmentType
  | AttachmentTypeGroup
  | Attendance
  | AvailableSignup
  | Blockout
  | BlockoutDate
  | BlockoutException
  | BlockoutScheduleConflict
  | Chat
  | Contributor
  | CustomSlide
  | Email
  | EmailTemplate
  | EmailTemplateRenderedResponse
  | Folder
  | FolderPath
  | Item
  | ItemNote
  | ItemNoteCategory
  | ItemTime
  | Key
  | Layout
  | Live
  | LiveController
  | Media
  | MediaSchedule
  | NeededPosition
  | Organization
  | Person
  | PersonTeamPositionAssignment
  | Plan
  | PlanNote
  | PlanNoteCategory
  | PlanPerson
  | PlanPersonTime
  | PlanTemplate
  | PlanTime
  | PublicView
  | ReportTemplate
  | Schedule
  | ScheduledPerson
  | SchedulingPreference
  | Series
  | ServiceType
  | ServiceTypePath
  | SignupSheet
  | SignupSheetMetadata
  | SkippedAttachment
  | Song
  | SongSchedule
  | SongbookStatus
  | SplitTeamRehearsalAssignment
  | Tag
  | TagGroup
  | Team
  | TeamLeader
  | TeamPosition
  | TextSetting
  | TimePreferenceOption
  | Zoom;

type Datetime =
  | `${number}-${number}-${number}T${number}:${number}:${number}Z`
  | `${number}-${number}-${number}T${number}:${number}:${number}${
      | "+"
      | "-"}${number}:${number}`;
type DatetimeOpt = Datetime | null;

/**
 * Type of the response from the PCO Services API.
 * @internal
 */
export type ServicesResponse = Response<AnyResource | AnyResource[]>;

/**
 * @ignore
 */
export type Arrangement = Resource<
  "Arrangement",
  {
    archived_at: DatetimeOpt;
    bpm: number;
    chord_chart: string | null;
    chord_chart_chord_color: number;
    chord_chart_columns: number;
    chord_chart_font: string;
    chord_chart_font_size: number;
    chord_chart_key: string | null;
    created_at: Datetime;
    has_chord_chart: boolean;
    has_chords: boolean;
    isrc: string;
    length: number;
    lyrics: string | null;
    lyrics_enabled: boolean;
    meter: string;
    mtid: string;
    name: string;
    notes: unknown; // TODO: type
    number_chart_enabled: boolean;
    numeral_chart_enabled: boolean;
    print_margin: string;
    print_orientation: string;
    print_page_size: string;
    rehearsal_mix_id: string;
    rehearsal_mix_thumbnail: unknown; // TODO: type
    sequence: string[];
    sequence_full: {
      label: string;
      number: string;
    }[];
    sequence_short: string[];
    updated_at: Datetime;
  },
  {
    updated_by: Person;
    created_by: Person;
    song: Song;
  }
>;

/**
 * @ignore
 */
export type ArrangementSections = Resource<
  "ArrangementSections",
  {
    sections: {
      label: string;
      lyrics: string;
      breaks_at: unknown; // TODO: type
    }[];
  },
  undefined
>;

/**
 * @ignore
 */
export type Attachment = Resource<"Attachment", {}>;

/**
 * @ignore
 */
export type AttachmentActivity = Resource<"AttachmentActivity", {}>;

/**
 * @ignore
 */
export type AttachmentType = Resource<
  "AttachmentType",
  {
    aliases: string[];
    built_in: boolean;
    capoed_chord_charts: boolean;
    chord_charts: boolean;
    exclusions: unknown[]; // TODO: type
    lyrics: boolean;
    name: string;
    number_charts: boolean;
    numeral_charts: boolean;
  },
  {
    attachment_type_group: AttachmentTypeGroup[];
  }
>;

/**
 * @ignore
 */
export type AttachmentTypeGroup = Resource<
  "AttachmentTypeGroup",
  {
    name: string;
    readonly: boolean;
  }
>;

/**
 * @ignore
 */
export type Attendance = Resource<"Attendance", {}>;

/**
 * @ignore
 */
export type AvailableSignup = Resource<
  "AvailableSignup",
  {
    organization_name: string;
    planning_center_url: string;
    service_type_name: string;
    signups_available: boolean;
  },
  {
    organization: Organization;
    person: Person;
    service_type: ServiceType;
  }
>;

/**
 * @ignore
 */
export type Blockout = Resource<
  "Blockout",
  {
    created_at: Datetime;
    description: string;
    ends_at: Datetime;
    group_identifier: string;
    organization_name: string;
    reason: string;
    repeat_frequency: string;
    repeat_interval: any;
    repeat_period: any;
    repeat_until: any;
    settings: any;
    share: boolean;
    starts_at: Datetime;
    time_zone: string;
    updated_at: Datetime;
  },
  {
    person: Person;
    organization: Organization;
  }
>;

/**
 * @ignore
 */
export type BlockoutDate = Resource<"BlockoutDate", {}>;

/**
 * @ignore
 */
export type BlockoutException = Resource<"BlockoutException", {}>;

/**
 * @ignore
 */
export type BlockoutScheduleConflict = Resource<"BlockoutScheduleConflict", {}>;

/**
 * @ignore
 */
export type Chat = Resource<"Chat", {}>;

/**
 * @ignore
 */
export type Contributor = Resource<"Contributor", {}>;

/**
 * @ignore
 */
export type CustomSlide = Resource<"CustomSlide", {}>;

/**
 * @ignore
 */
export type Email = Resource<
  "Email",
  {
    primary: boolean;
    address: string;
  }
>;

/**
 * @ignore
 */
export type EmailTemplate = Resource<"EmailTemplate", {}>;

/**
 * @ignore
 */
export type EmailTemplateRenderedResponse = Resource<
  "EmailTemplateRenderedResponse",
  {}
>;

/**
 * @ignore
 */
export type Folder = Resource<
  "Folder",
  {
    container: string;
    created_at: Datetime;
    name: string;
    updated_at: Datetime;
  },
  {
    parent: Folder;
    // TODO: Campus ???
  }
>;

/**
 * @ignore
 */
export type FolderPath = Resource<"FolderPath", {}>;

/**
 * @ignore
 */
export type Item = Resource<
  "Item",
  {
    created_at: Datetime;
    custom_arrangement_sequence: unknown; // TODO: type
    custom_arrangement_sequence_full: unknown; // TODO: type
    custom_arrangement_sequence_short: unknown; // TODO: type
    description: string;
    html_details: unknown; // TODO: type
    item_type: string;
    key_name: unknown; // TODO: type
    length: number;
    sequence: number;
    service_position: string;
    title: string;
    updated_at: Datetime;
  },
  {
    plan: Plan;
    song: Song;
    arrangement: Arrangement;
    key: Key;
    selected_layout: Layout;
    selected_background: Attachment;
  }
>;

/**
 * @ignore
 */
export type ItemNote = Resource<"ItemNote", {}>;

/**
 * @ignore
 */
export type ItemNoteCategory = Resource<"ItemNoteCategory", {}>;

/**
 * @ignore
 */
export type ItemTime = Resource<"ItemTime", {}>;

/**
 * @ignore
 */
export type Key = Resource<"Key", {}>;

/**
 * @ignore
 */
export type Layout = Resource<"Layout", {}>;

/**
 * @ignore
 */
export type Live = Resource<"Live", {}>;

/**
 * @ignore
 */
export type LiveController = Resource<"LiveController", {}>;

/**
 * @ignore
 */
export type Media = Resource<"Media", {}>;

/**
 * @ignore
 */
export type MediaSchedule = Resource<"MediaSchedule", {}>;

/**
 * @ignore
 */
export type NeededPosition = Resource<"NeededPosition", {}>;

/**
 * @ignore
 */
export type Organization = Resource<
  "Organization",
  {
    allow_mp3_download: boolean;
    calendar_starts_on_sunday: boolean;
    ccli: unknown | null; // TODO: type
    ccli_auto_reporting_enabled: boolean;
    ccli_connected: boolean;
    ccli_reporting_enabled: boolean;
    created_at: Datetime;
    date_format: string; // TODO: enum
    extra_file_storage_allowed: boolean;
    file_storage_exceeded: boolean;
    file_storage_extra_charges: unknown | null;
    file_storage_extra_enabled: boolean;
    file_storage_size: number;
    file_storage_size_used: number;
    legacy_id: string;
    music_stand_enabled: boolean;
    name: string;
    owner_name: string;
    people_allowed: number;
    people_remaining: number;
    projector_enabled: boolean;
    rehearsal_mix_enabled: boolean;
    rehearsal_pack_connected: boolean;
    required_to_set_download_permission: string; // TODO: enum
    secret: string;
    time_zone: string; // TODO: enum
    twenty_four_hour_time: boolean;
    updated_at: Datetime;
  },
  undefined
>;

/**
 * @ignore
 */
export type Person = Resource<
  "Person",
  {
    access_media_attachments: boolean;
    access_plan_attachments: boolean;
    access_song_attachments: boolean;
    anniversary: string | null;
    archived: boolean;
    archived_at: DatetimeOpt;
    assigned_to_rehearsal_team: boolean;
    birthdate: string | null;
    created_at: Datetime;
    facebook_id: string | null;
    first_name: string;
    full_name: string;
    given_name: string | null;
    ical_code: string;
    last_name: string;
    legacy_id: string;
    logged_in_at: Datetime;
    max_permissions: string;
    max_plan_permissions: string;
    media_permissions: string;
    middle_name: string | null;
    name_prefix: string | null;
    name_suffix: string | null;
    nickname: string | null;
    notes: unknown | null; // TODO: type
    passed_background_check: boolean;
    permissions: string;
    photo_thumbnail_url: string;
    photo_url: string;
    praise_charts_enabled: boolean;
    preferred_app: string;
    preferred_max_plans_per_day: number | null;
    preferred_max_plans_per_month: number | null;
    site_administrator: boolean;
    song_permissions: string;
    status: string;
    updated_at: Datetime;
  },
  {
    created_by: Person;
    updated_by: Person;
    current_folder: Folder;
  }
>;

/**
 * @ignore
 */
export type PersonTeamPositionAssignment = Resource<
  "PersonTeamPositionAssignment",
  {}
>;

/**
 * @ignore
 */
export type Plan = Resource<
  "Plan",
  {
    can_view_order: boolean;
    created_at: Datetime;
    dates: string;
    files_expire_at: Datetime;
    items_count: number;
    last_time_at: Datetime;
    multi_day: boolean;
    needed_positions_count: number;
    other_time_count: number;
    permissions: string; // TODO: enum
    plan_notes_count: number;
    plan_people_count: number;
    planning_center_url: string;
    prefers_order_view: boolean;
    public: boolean;
    rehearsable: boolean;
    rehearsal_time_count: number;
    reminders_disabled: boolean;
    series_title: string | null;
    service_time_count: number;
    short_dates: string;
    sort_date: string;
    title: string | null;
    total_length: number;
    updated_at: Datetime;
  },
  {
    service_type: ServiceType;
    previous_plan: Plan;
    next_plan: Plan;
    series: Series;
    created_by: Person;
    updated_by: Person;
    attachment_types: AttachmentType;
  }
>;

/**
 * @ignore
 */
export type PlanNote = Resource<"PlanNote", {}>;

/**
 * @ignore
 */
export type PlanNoteCategory = Resource<"PlanNoteCategory", {}>;

/**
 * @ignore
 */
export type PlanPerson = Resource<"PlanPerson", {}>;

/**
 * @ignore
 */
export type PlanPersonTime = Resource<"PlanPersonTime", {}>;

/**
 * @ignore
 */
export type PlanTemplate = Resource<"PlanTemplate", {}>;

/**
 * @ignore
 */
export type PlanTime = Resource<"PlanTime", {}>;

/**
 * @ignore
 */
export type PublicView = Resource<"PublicView", {}>;

/**
 * @ignore
 */
export type ReportTemplate = Resource<"ReportTemplate", {}>;

/**
 * @ignore
 */
export type Schedule = Resource<"Schedule", {}>;

/**
 * @ignore
 */
export type ScheduledPerson = Resource<"ScheduledPerson", {}>;

/**
 * @ignore
 */
export type SchedulingPreference = Resource<"SchedulingPreference", {}>;

/**
 * @ignore
 */
export type Series = Resource<"Series", {}>;

/**
 * @ignore
 */
export type ServiceType = Resource<
  "ServiceType",
  {
    archived_at: DatetimeOpt;
    attachment_types_enabled: boolean;
    background_check_permissions: string;
    comment_permissions: string;
    created_at: Datetime;
    custom_item_types: {
      name: string;
      color: string;
    }[];
    deleted_at: DatetimeOpt;
    frequency: string;
    last_plan_from: string;
    name: string;
    permissions: string;
    scheduled_publish: boolean;
    sequence: number;
    standard_item_types: {
      name: string;
      color: string;
    }[];
    updated_at: Datetime;
  },
  {
    parent: Folder;
  }
>;

/**
 * @ignore
 */
export type ServiceTypePath = Resource<"ServiceTypePath", {}>;

/**
 * @ignore
 */
export type SignupSheet = Resource<"SignupSheet", {}>;

/**
 * @ignore
 */
export type SignupSheetMetadata = Resource<"SignupSheetMetadata", {}>;

/**
 * @ignore
 */
export type SkippedAttachment = Resource<"SkippedAttachment", {}>;

/**
 * @ignore
 */
export type Song = Resource<
  "Song",
  {
    admin: string | null;
    author: string | null;
    ccli_number: number | null;
    copyright: string | null;
    created_at: Datetime;
    hidden: boolean;
    last_scheduled_at: Datetime;
    last_scheduled_short_dates: string;
    notes: string | null;
    themes: string | null;
    title: string;
    updated_at: Datetime;
  },
  undefined
>;

/**
 * @ignore
 */
export type SongSchedule = Resource<
  "SongSchedule",
  {
    arrangement_name: string;
    key_name: string | null;
    plan_dates: string;
    plan_sort_date: string;
    plan_visible: boolean;
    service_type_name: string;
  },
  {
    arrangement: Arrangement;
    key: Key;
    plan: Plan;
    service_type: ServiceType;
    item: Item;
  }
>;

/**
 * @ignore
 */
export type SongbookStatus = Resource<"SongbookStatus", {}>;

/**
 * @ignore
 */
export type SplitTeamRehearsalAssignment = Resource<
  "SplitTeamRehearsalAssignment",
  {}
>;

/**
 * @ignore
 */
export type Tag = Resource<"Tag", {}>;

/**
 * @ignore
 */
export type TagGroup = Resource<"TagGroup", {}>;

/**
 * @ignore
 */
export type Team = Resource<
  "Team",
  {
    archived_at: DatetimeOpt;
    assigned_directly: boolean;
    created_at: Datetime;
    default_prepare_notifications: boolean;
    default_status: string; // TODO: enum
    last_plan_from: string; // TODO: enum
    name: string;
    rehearsal_team: boolean;
    schedule_to: "plan" | "time";
    secure_team: boolean;
    sequence: unknown | null; // TODO: type
    stage_color: string;
    stage_variant: string; // TODO: enum
    updated_at: Datetime;
    viewers_see: number;
  },
  {
    default_responds_to: Person;
    service_type: ServiceType;
    service_types: ServiceType[];
  }
>;

/**
 * @ignore
 */
export type TeamLeader = Resource<
  "TeamLeader",
  {
    send_responses_for_accepts: boolean;
    send_responses_for_blockouts: boolean;
    send_responses_for_declines: boolean;
  },
  {
    person: Person;
    team: Team;
  }
>;

/**
 * @ignore
 */
export type TeamPosition = Resource<"TeamPosition", {}>;

/**
 * @ignore
 */
export type TextSetting = Resource<"TextSetting", {}>;

/**
 * @ignore
 */
export type TimePreferenceOption = Resource<"TimePreferenceOption", {}>;

/**
 * @ignore
 */
export type Zoom = Resource<"Zoom", {}>;
