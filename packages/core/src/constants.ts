/**
 * @deprecated Use AllowedExtensionPoints instead
 */
export enum AllowedTouchpoints {
  standalone = 'standalone',
  xmcFullscreen = 'xmc:fullscreen',
  xmcPagesContextPanel = 'xmc:pages:contextpanel',
  xmcPagesCustomField = 'xmc:pages:customfield',
  xmcDashboardBlocks = 'xmc:dashboardblocks',
}

export type AllowedExtensionPoints = AllowedTouchpoints;
