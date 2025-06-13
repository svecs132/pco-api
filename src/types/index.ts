export type Response<Resource extends AnyResource | AnyResource[]> =
  | {
      data: Resource;
      included: AnyResource[];
      meta?: {
        [key: string]: unknown;
      };
    }
  | {
      errors: {
        code: string;
        detail: string;
        status: string;
      }[];
    };

type RelOne<T extends AnyResource> = {
  data: {
    type: T["type"];
    id: string;
  } | null;
};

type RelMany<T extends AnyResource> = {
  data: {
    type: T["type"];
    id: string;
  }[];
};

type Links = {
  self: string;
  [key: string]: string;
};

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

type Resource<
  Type extends string,
  Attributes extends { [S: string]: unknown },
  Relationships extends
    | { [S: string]: AnyResource | AnyResource[] }
    | undefined = undefined
> = {
  type: Type;
  id: string;
  attributes: Attributes;
  links: Links;
  relationships: Relationships extends undefined
    ? undefined
    : {
        [Rel in keyof Relationships]: Relationships[Rel] extends AnyResource[]
          ? RelMany<Relationships[Rel][number]>
          : Relationships[Rel] extends AnyResource
          ? RelOne<Relationships[Rel]>
          : never;
      };
};

export type Arrangement = Resource<
  "Arrangement",
  {
    archived_at: string | null;
    bpm: number;
    chord_chart: string | null;
    chord_chart_chord_color: number;
    chord_chart_columns: number;
    chord_chart_font: string;
    chord_chart_font_size: number;
    chord_chart_key: string | null;
    created_at: string;
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
    updated_at: string;
  },
  {
    updated_by: Person;
    created_by: Person;
    song: Song;
  }
>;

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

export type Attachment = Resource<"Attachment", {}>;

export type AttachmentActivity = Resource<"AttachmentActivity", {}>;

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

export type AttachmentTypeGroup = Resource<
  "AttachmentTypeGroup",
  {
    name: string;
    readonly: boolean;
  }
>;

export type Attendance = Resource<"Attendance", {}>;

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

export type Blockout = Resource<
  "Blockout",
  {
    created_at: string;
    description: string;
    ends_at: string;
    group_identifier: string;
    organization_name: string;
    reason: string;
    repeat_frequency: string;
    repeat_interval: any;
    repeat_period: any;
    repeat_until: any;
    settings: any;
    share: boolean;
    starts_at: string;
    time_zone: string;
    updated_at: string;
  },
  {
    person: Person;
    organization: Organization;
  }
>;

export type BlockoutDate = Resource<"BlockoutDate", {}>;

export type BlockoutException = Resource<"BlockoutException", {}>;

export type BlockoutScheduleConflict = Resource<"BlockoutScheduleConflict", {}>;

export type Chat = Resource<"Chat", {}>;

export type Contributor = Resource<"Contributor", {}>;

export type CustomSlide = Resource<"CustomSlide", {}>;

export type Email = Resource<"Email", {}>;

export type EmailTemplate = Resource<"EmailTemplate", {}>;

export type EmailTemplateRenderedResponse = Resource<
  "EmailTemplateRenderedResponse",
  {}
>;

export type Folder = Resource<
  "Folder",
  {
    container: string;
    created_at: string;
    name: string;
    updated_at: string;
  },
  {
    parent: Folder;
    // TODO: Campus ???
  }
>;

export type FolderPath = Resource<"FolderPath", {}>;

export type Item = Resource<
  "Item",
  {
    created_at: string;
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
    updated_at: string;
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

export type ItemNote = Resource<"ItemNote", {}>;

export type ItemNoteCategory = Resource<"ItemNoteCategory", {}>;

export type ItemTime = Resource<"ItemTime", {}>;

export type Key = Resource<"Key", {}>;

export type Layout = Resource<"Layout", {}>;

export type Live = Resource<"Live", {}>;

export type LiveController = Resource<"LiveController", {}>;

export type Media = Resource<"Media", {}>;

export type MediaSchedule = Resource<"MediaSchedule", {}>;

export type NeededPosition = Resource<"NeededPosition", {}>;

export type Organization = Resource<
  "Organization",
  {
    allow_mp3_download: boolean;
    calendar_starts_on_sunday: boolean;
    ccli: unknown | null; // TODO: type
    ccli_auto_reporting_enabled: boolean;
    ccli_connected: boolean;
    ccli_reporting_enabled: boolean;
    created_at: string;
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
    updated_at: string;
  },
  undefined
>;

export type Person = Resource<
  "Person",
  {
    access_media_attachments: boolean;
    access_plan_attachments: boolean;
    access_song_attachments: boolean;
    anniversary: string | null;
    archived: boolean;
    archived_at: string | null;
    assigned_to_rehearsal_team: boolean;
    birthdate: string | null;
    created_at: string;
    facebook_id: string | null;
    first_name: string;
    full_name: string;
    given_name: string | null;
    ical_code: string;
    last_name: string;
    legacy_id: string;
    logged_in_at: string;
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
    updated_at: string;
  },
  {
    created_by: Person;
    updated_by: Person;
    current_folder: Folder;
  }
>;

export type PersonTeamPositionAssignment = Resource<
  "PersonTeamPositionAssignment",
  {}
>;

export type Plan = Resource<
  "Plan",
  {
    can_view_order: boolean;
    created_at: string;
    dates: string;
    files_expire_at: string;
    items_count: number;
    last_time_at: string;
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
    updated_at: string;
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

export type PlanNote = Resource<"PlanNote", {}>;

export type PlanNoteCategory = Resource<"PlanNoteCategory", {}>;

export type PlanPerson = Resource<"PlanPerson", {}>;

export type PlanPersonTime = Resource<"PlanPersonTime", {}>;

export type PlanTemplate = Resource<"PlanTemplate", {}>;

export type PlanTime = Resource<"PlanTime", {}>;

export type PublicView = Resource<"PublicView", {}>;

export type ReportTemplate = Resource<"ReportTemplate", {}>;

export type Schedule = Resource<"Schedule", {}>;

export type ScheduledPerson = Resource<"ScheduledPerson", {}>;

export type SchedulingPreference = Resource<"SchedulingPreference", {}>;

export type Series = Resource<"Series", {}>;

export type ServiceType = Resource<
  "ServiceType",
  {
    archived_at: string | null;
    attachment_types_enabled: boolean;
    background_check_permissions: string;
    comment_permissions: string;
    created_at: string;
    custom_item_types: {
      name: string;
      color: string;
    }[];
    deleted_at: string | null;
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
    updated_at: string;
  },
  {
    parent: Folder;
  }
>;

export type ServiceTypePath = Resource<"ServiceTypePath", {}>;

export type SignupSheet = Resource<"SignupSheet", {}>;

export type SignupSheetMetadata = Resource<"SignupSheetMetadata", {}>;

export type SkippedAttachment = Resource<"SkippedAttachment", {}>;

export type Song = Resource<
  "Song",
  {
    admin: string | null;
    author: string | null;
    ccli_number: number | null;
    copyright: string | null;
    created_at: string;
    hidden: boolean;
    last_scheduled_at: string;
    last_scheduled_short_dates: string;
    notes: string | null;
    themes: string | null;
    title: string;
    updated_at: string;
  },
  undefined
>;

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

export type SongbookStatus = Resource<"SongbookStatus", {}>;

export type SplitTeamRehearsalAssignment = Resource<
  "SplitTeamRehearsalAssignment",
  {}
>;

export type Tag = Resource<"Tag", {}>;

export type TagGroup = Resource<"TagGroup", {}>;

export type Team = Resource<"Team", {}>;

export type TeamLeader = Resource<"TeamLeader", {}>;

export type TeamPosition = Resource<"TeamPosition", {}>;

export type TextSetting = Resource<"TextSetting", {}>;

export type TimePreferenceOption = Resource<"TimePreferenceOption", {}>;

export type Zoom = Resource<"Zoom", {}>;
